import 'dotenv/config';
import { serve } from '@hono/node-server';


import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

// Force restart: 789
import { extendZodWithOpenApi } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { initializeAuth, signIn, validateSession, getUser, getAuthAdapter, validatePassword, DEFAULT_PASSWORD_POLICY } from '@labs/auth';
import { DrizzleAdapter } from '@labs/auth/adapters';

import { authConfig, users } from '@labs/database/auth';


import { getTenantDb } from '@labs/database';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

extendZodWithOpenApi(z);

// Initialize Auth SDK with Drizzle Adapter
initializeAuth(
  {
    providers: ['email_password'],
    sessionDuration: 3600 * 1000 * 24, // 24 hours
  }, 
  new DrizzleAdapter()
);

const app = new OpenAPIHono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Default Route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Auth Service (Hono)</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #09090b; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          h1 { margin-bottom: 0.5rem; }
          a { color: #a78bfa; text-decoration: none; margin: 0 10px; border: 1px solid #27272a; padding: 10px 20px; border-radius: 6px; transition: all 0.2s; }
          a:hover { background: #27272a; }
          .links { margin-top: 2rem; }
        </style>
      </head>
      <body>
        <h1>Auth Service</h1>
        <p>Running on Hono 🔥</p>
        <p>Powered by @labs/auth & @labs/database (Multi-Tenant)</p>
        <div class="links">
          <a href="/doc">OpenAPI Spec</a>
          <a href="/docs">API Documentation</a>
        </div>
      </body>
    </html>
  `);
});

// APIs

// Login Endpoint
app.openapi(
  createRoute({
    method: 'post',
    path: '/api/auth/login',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email().openapi({ example: 'admin@acme-corp.com' }),
              password: z.string().min(1).openapi({ example: 'password123' }),
              tenantId: z.string().min(1).default('acme-corp').openapi({ example: 'acme-corp' })
            })
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Login successful',
        content: {
          'application/json': {
            schema: z.object({
              token: z.string().openapi({ example: 'acme-corp.token123' }),

              user: z.object({
                id: z.string().openapi({ example: '1' }),
                email: z.string().openapi({ example: 'admin@acme-corp.com' }),
                tenantId: z.string().openapi({ example: 'acme-corp' }),
                isSuperAdmin: z.boolean().optional().openapi({ example: true })
              }).openapi({ example: { id: '1', email: 'admin@acme-corp.com', tenantId: 'acme-corp', isSuperAdmin: true } })
            }).openapi({ example: { token: '...', user: { id: '1', email: '...', tenantId: '...', isSuperAdmin: true } } }),
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: { 'application/json': { schema: z.object({ error: z.string() }) } }
      }
    },
  }),
  async (c) => {
    try {
      const { email, password, tenantId } = c.req.valid('json');
      
      // Verify credentials using the adapter directly
      const adapter = getAuthAdapter();
      const user = await adapter.verifyPassword(email, tenantId, password);
      
      if (!user) {
        return c.json({ error: 'Invalid email or password' }, 401);
      }
      
      // Extract IP and User-Agent from request headers
      const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0].trim() || 
                       c.req.header('x-real-ip') || 
                       '127.0.0.1'; // localhost in development
      const rawUserAgent = c.req.header('user-agent') || 'unknown';
      const userAgent = parseUserAgent(rawUserAgent); // Parse to readable format
      
      // Create session with HTTP context
      const session = await createSession(user, 'email_password', ipAddress, userAgent);
      
      return c.json({
        token: session.token,
        user: { 
            id: user.id, 
            email: user.email, 
            tenantId: user.tenantId,
            isSuperAdmin: user.isSuperAdmin
        }
      });
    } catch (err: any) {
      return c.json({ error: err.message || 'Login failed' }, 401);
    }
  }
);


// Auth Config Endpoint
app.openapi(
  createRoute({
    method: 'get',
    path: '/api/auth/config',
    request: {
      query: z.object({
        tenantId: z.string().openapi({ example: 'acme-corp' })
      })
    },
    responses: {
      200: {
        description: 'Tenant Auth Configuration',
        content: {
          'application/json': {
            schema: z.object({
              enabledProviders: z.array(z.string()).openapi({ example: ['email_password', 'google'] }),
              passwordPolicy: z.any().openapi({ example: { minLength: 8 } }),
              selfRegistrationEnabled: z.boolean().openapi({ example: true }),
              name: z.string().optional().openapi({ example: 'Acme Corp' }),
              termsUrl: z.string().optional(),
              privacyUrl: z.string().optional()
            })
          }
        }
      },
      404: {
        description: 'Config not found',
        content: { 'application/json': { schema: z.object({ error: z.string() }) } }
      }
    }
  }),


  async (c) => {
    const { tenantId } = c.req.valid('query');

    try {
      const db = getTenantDb(tenantId);
      
      // Fetch Auth Config from Tenant DB
      const [config] = await db.select().from(authConfig).limit(1);
      
      if (!config) {
         // Default config if not set in DB yet
         return c.json({
             enabledProviders: ['email_password'],
             passwordPolicy: { minLength: 8 },
             selfRegistrationEnabled: true,
             providerConfig: {},
             mfaEnabled: false,
             name: tenantId // Default name if no config
         });
      }

      return c.json({
        enabledProviders: config.enabledProviders as string[],
        passwordPolicy: config.passwordPolicy,
        selfRegistrationEnabled: config.selfRegistrationEnabled,
        providerConfig: config.providerConfig,
        mfaEnabled: config.mfaEnabled,
        name: config.name || tenantId,
        termsUrl: config.termsUrl || undefined,
        privacyUrl: config.privacyUrl || undefined,
        // @ts-ignore - settings added recently
        settings: config.settings 
      });
    } catch (e) {
      console.error(e);
      // Fallback
      return c.json({ enabledProviders: ['email_password'], passwordPolicy: { minLength: 8 }, selfRegistrationEnabled: true, name: tenantId }, 500);
    }
  }
);

// Update Auth Config Endpoint (UPSERT)
app.openapi(
    createRoute({
        method: 'patch',
        path: '/api/auth/config',
        request: {
            query: z.object({
                tenantId: z.string().openapi({ example: 'acme-corp' })
            }),
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            enabledProviders: z.array(z.string()).optional(),

                            passwordPolicy: z.any().optional(),
                            name: z.string().optional(),
                            selfRegistrationEnabled: z.boolean().optional(),
                            mfaEnabled: z.boolean().optional(),
                            providerConfig: z.any().optional(),

                            termsUrl: z.string().optional(),
                            privacyUrl: z.string().optional(),
                            settings: z.record(z.any()).optional()
                        })
                    }
                }
            }
        },

    responses: {
      200: {
        description: 'Config Updated',
        content: { 'application/json': { schema: z.object({ success: z.boolean(), id: z.string() }) } }
      },
      500: {
        description: 'Server Error',
        content: { 'application/json': { schema: z.object({ error: z.any() }) } }
      }
    }
  }),

  async (c) => {
    const { tenantId } = c.req.valid('query');
    const body = c.req.valid('json');

    try {
      console.log(`[PATCH Config] Processing update for tenant: ${tenantId}`);
      const db = getTenantDb(tenantId);
      
      // Check if config exists
      const [existing] = await db.select().from(authConfig).limit(1);

      console.log(`[PATCH Config] Updating auth config fields:`, body);

      if (existing) {
        await db.update(authConfig)
            .set({
                ...body, 
                updatedAt: new Date()
            })
            .where(eq(authConfig.id, existing.id));
        return c.json({ success: true, id: existing.id });
      } else {
        const [newConfig] = await db.insert(authConfig).values({
            enabledProviders: body.enabledProviders || ['email_password'],
            passwordPolicy: body.passwordPolicy,
            selfRegistrationEnabled: body.selfRegistrationEnabled ?? true,
            providerConfig: body.providerConfig,
            mfaEnabled: body.mfaEnabled,
            termsUrl: body.termsUrl,
        }).returning();
  
      if (!newConfig) return c.json({ error: 'Failed to update config' }, 500);

      return c.json({ success: true, id: newConfig.id.toString() } as any);
      }
    } catch (e: any) {
      console.error(e);
      return c.json({ error: e.message }, 500);
    }
  }
);

// Signup Endpoint
app.openapi(
  createRoute({
    method: 'post',
    path: '/api/auth/signup',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email().openapi({ example: 'newuser@acme-corp.com' }),
              password: z.string().min(6).openapi({ example: 'secret123' }),
              tenantId: z.string().openapi({ example: 'acme-corp' }),
              name: z.string().optional().openapi({ example: 'New User' })
            })
          }
        }
      }
    },
    responses: {
      200: {
          description: 'User created',
          content: {
              'application/json': {
                  schema: z.object({
                      id: z.string(),
                      email: z.string()
                  })
              }
          }
      },
       400: { description: 'Bad Request', content: { 'application/json': { schema: z.object({ error: z.string() }) } } }
    }
  }),
  async (c) => {
      const { email, password, tenantId, name } = c.req.valid('json');
      const db = getTenantDb(tenantId);
      
      // 1. Check Config
      const [config] = await db.select().from(authConfig).limit(1);
      if (config) {
          if (!config.selfRegistrationEnabled) {
              return c.json({ error: 'Registration is disabled for this tenant.' }, 400);
          }

           // Validate Password Policy
           const policy = { ...DEFAULT_PASSWORD_POLICY, ...(config.passwordPolicy as any) };
           const validation = validatePassword(password, policy, { email, name });
           
           if (!validation.isValid) {
               return c.json({ error: validation.errors[0] }, 400); // Return first error
           }
      }
      
      // 2. Check User Existence
      const [existing] = await db.select().from(users).where(eq(users.email, email));
      if (existing) {
          return c.json({ error: 'Email already exists.' }, 400);
      }

      // 3. Create User
      const [newUser] = await db.insert(users).values({
          email,
          tenantId,
          name,
          passwordHash: password, // Storing as plaintext for Demo MVP. Should be hashed!

          updatedAt: new Date()
      }).returning();
      

      if (!newUser) return c.json({ error: 'Failed to create user' }, 400); // Should not happen given logic
      

      return c.json({ id: newUser.id.toString(), email: newUser.email } as any);
  }
);

// Verify Session Endpoint
app.openapi(
  createRoute({
    method: 'get',
    path: '/api/auth/me',
    responses: {
      200: {
        description: 'Current User',
        content: {
          'application/json': {
            schema: z.object({

              user: z.object({
                id: z.string(),
                email: z.string(),
                tenantId: z.string(),
                isSuperAdmin: z.boolean().optional()
              })
            })
          }
        }

      },
      401: { description: 'Unauthorized' }
    },
    security: [
        {
            BearerAuth: []
        }
    ]
  }),
  async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Missing token' }, 401);
    
    const token = authHeader.split(' ')[1];
    try {
        const session = await validateSession(token);
        if (!session) return c.json({ error: 'Invalid token' }, 401);


        const user = await getUser(session.userId, String(session.tenantId || 'default'));
        if (!user) return c.json({ error: 'User not found' }, 401);


        return c.json({ 
            user: { 
                id: user.id, 
                email: user.email, 
                tenantId: user.tenantId,
                isSuperAdmin: user.isSuperAdmin 
            } 
        });
    } catch (e) {
        return c.json({ error: 'Validation failed' }, 401);
    }
  }
);

// OpenAPI Spec
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'RJ Suite Auth Service API',
    description: 'Authentication service powered by Hono and @labs/auth.',

  },
  // components defined implicitly by registry
  security: [], 
});

// Scalar UI
app.get(
  '/docs',
  apiReference({
    theme: 'purple',
    spec: {
      url: '/doc',
    },
  })
);


const port = 3002;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

/*
 * Google OAuth Routes
 */

import { createSession } from '@labs/auth';
import { getConfiguredGoogleProvider, getConfiguredGitHubProvider } from './utils';
import { parseUserAgent } from '@labs/utils';

app.get('/api/auth/google', async (c) => {

    const tenantId = c.req.query('tenantId') || 'rj_local';
    

    try {
        const google = await getConfiguredGoogleProvider(tenantId);
        const state = JSON.stringify({ tenantId });
        const authUrl = google.getAuthUrl(state);
        console.log(`[Google Auth] Generated URL: ${authUrl}`);
        return c.redirect(authUrl);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
  }
);


// Forgot Password Endpoint
app.openapi(
  createRoute({
    method: 'post',
    path: '/api/auth/forgot-password',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email(),
              tenantId: z.string().min(1)
            })
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Password reset link sent',
        content: {
          'application/json': {
            schema: z.object({
              success: z.boolean(),
              message: z.string()
            })
          }
        }
      },

      400: {
        description: 'Invalid request',
        content: {
          'application/json': {
            schema: z.object({ error: z.string() })
          }
        }
      },
      500: {
         description: 'Server error',
         content: {
           'application/json': {
             schema: z.object({ error: z.string() })
           }
         }
      }
    }
  }),
  async (c) => {
    const { email, tenantId } = c.req.valid('json');
    const db = getTenantDb(tenantId);
    
    try {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        
        if (!user) {
            // Return success even if user not found to prevent enumeration
            return c.json({ success: true, message: 'If an account exists, a reset link has been sent.' }, 200);
        }

        // Generate simple random token
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

        await db.update(users)
            .set({ 
                resetToken,
                resetTokenExpires: expiresAt,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id));

        // Mock Email Sending
        const resetLink = `http://localhost:3002/reset-password?token=${resetToken}&tenantId=${tenantId}`;
        console.log(`\n[EMAIL MOCK] Password Reset Link for ${email}: ${resetLink}\n`);

        return c.json({ success: true, message: 'If an account exists, a reset link has been sent.' }, 200);

    } catch (e: any) {
        console.error(e);
        return c.json({ error: 'Failed to process request' }, 500);
    }
  }
);


// Reset Password Endpoint
app.openapi(
  createRoute({
    method: 'post',
    path: '/api/auth/reset-password',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              token: z.string().min(1),
              password: z.string().min(8), // Enforce min length
              tenantId: z.string().min(1)
            })
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Password reset successful',
        content: {
          'application/json': {
            schema: z.object({ success: z.boolean(), message: z.string() })
          }
        }
      },

      400: {
        description: 'Invalid or expired token',
        content: {
          'application/json': {
            schema: z.object({ error: z.string() })
          }
        }
      },
      500: {
         description: 'Server error',
         content: {
           'application/json': {
             schema: z.object({ error: z.string() })
           }
         }
      }
    }
  }),
  async (c) => {
    const { token, password, tenantId } = c.req.valid('json');
    const db = getTenantDb(tenantId);

    try {
        const [user] = await db.select().from(users)
            .where(and(
                eq(users.resetToken, token),
                gt(users.resetTokenExpires, new Date()) // Token must be future expiry
            ))
            .limit(1);

        if (!user) {
            return c.json({ error: 'Invalid or expired reset token' }, 400);
        }

        // Validate Password Policy
        const [config] = await db.select().from(authConfig).limit(1);
        const policy = config ? { ...DEFAULT_PASSWORD_POLICY, ...(config.passwordPolicy as any) } : DEFAULT_PASSWORD_POLICY;
        
        // Context for reset is trickier as we might not have all user details readily loaded besides ID
        // But we can try to use what we match. We have 'user' object from basic select.
        const validation = validatePassword(password, policy, { 
             email: user.email,
             name: user.name || undefined
        });

        if (!validation.isValid) {
            return c.json({ error: validation.errors[0] }, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.update(users)
            .set({ 
                passwordHash: hashedPassword,
                resetToken: null,
                resetTokenExpires: null,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id));


        return c.json({ success: true, message: 'Password has been reset successfully.' }, 200);

    } catch (e: any) {
        console.error(e);
        return c.json({ error: 'Failed to reset password' }, 500);
    }
  }
);

app.get('/api/auth/google/callback', async (c) => {
    const code = c.req.query('code');
    const stateStr = c.req.query('state');
    
    if (!code) return c.json({ error: 'No code provided' }, 400);


    let tenantId = 'rj_local';
    try {
        if (stateStr) {
            const state = JSON.parse(stateStr);
            if (state.tenantId) tenantId = state.tenantId;
        }
    } catch(e) { /* ignore */ }
    
    try {
        const google = await getConfiguredGoogleProvider(tenantId);
        const user = await google.signIn({ code, tenantId });
        
        // Extract IP and User-Agent from request headers
        const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0].trim() || 
                         c.req.header('x-real-ip') || 
                         '127.0.0.1'; // localhost in development
        const rawUserAgent = c.req.header('user-agent') || 'unknown';
        const userAgent = parseUserAgent(rawUserAgent); // Parse to readable format
        
        const session = await createSession(user, 'google', ipAddress, userAgent);
        
        const appUrlStrict = process.env.APP_URL;
        if (!appUrlStrict) throw new Error("APP_URL not configured");
        
        return c.redirect(`${appUrlStrict}/auth/callback?token=${session.token}`);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GitHub OAuth Initiate
app.get('/api/auth/github', async (c) => {
    const tenantId = c.req.query('tenantId') || 'rj_local';
    
    try {
        const github = await getConfiguredGitHubProvider(tenantId);
        const state = JSON.stringify({ tenantId });
        const authUrl = github.getAuthUrl(state);
        console.log(`[GitHub Auth] Generated URL: ${authUrl}`);
        return c.redirect(authUrl);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// GitHub OAuth Callback
app.get('/api/auth/github/callback', async (c) => {
    const code = c.req.query('code');
    const stateStr = c.req.query('state');
    
    if (!code) return c.json({ error: 'No code provided' }, 400);

    let tenantId = 'rj_local';
    try {
        if (stateStr) {
            const state = JSON.parse(stateStr);
            if (state.tenantId) tenantId = state.tenantId;
        }
    } catch(e) { /* ignore */ }
    
    try {
        const github = await getConfiguredGitHubProvider(tenantId);
        const user = await github.signIn({ code, tenantId });
        
        // Extract IP and User-Agent from request headers
        const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0].trim() || 
                         c.req.header('x-real-ip') || 
                         '127.0.0.1'; // localhost in development
        const rawUserAgent = c.req.header('user-agent') || 'unknown';
        const userAgent = parseUserAgent(rawUserAgent); // Parse to readable format
        
        const session = await createSession(user, 'github', ipAddress, userAgent);
        
        const appUrlStrict = process.env.APP_URL;
        if (!appUrlStrict) throw new Error("APP_URL not configured");
        
        return c.redirect(`${appUrlStrict}/auth/callback?token=${session.token}`);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

export default app;
