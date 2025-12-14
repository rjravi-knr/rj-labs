import { serve } from '@hono/node-server';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { initializeAuth, signIn } from '@labs/auth';
import { DrizzleAdapter } from '@labs/auth/adapters';
import { authConfig, users } from '@labs/database/auth';
import { getTenantDb } from '@labs/database';
import { eq } from 'drizzle-orm';

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
                tenantId: z.string().openapi({ example: 'acme-corp' })
              }).openapi({ example: { id: '1', email: 'admin@acme-corp.com', tenantId: 'acme-corp' } })
            }).openapi({ example: { token: '...', user: { id: '1', email: '...', tenantId: '...' } } }),
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
      
      const { user, session } = await signIn('email_password', { email, password }, tenantId);
      
      return c.json({
        token: session.token,
        user: { id: user.id, email: user.email, tenantId: user.tenantId }
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
              selfRegistrationEnabled: z.boolean().openapi({ example: true })
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
      // Check if config exists, if not return default
      const [config] = await db.select().from(authConfig).limit(1);
      
      if (!config) {
         // Default config if not set in DB yet
         return c.json({
             enabledProviders: ['email_password'],
             passwordPolicy: { minLength: 8 },
             selfRegistrationEnabled: true
         });
      }

      return c.json({
        enabledProviders: config.enabledProviders as string[],
        passwordPolicy: config.passwordPolicy,
        selfRegistrationEnabled: config.selfRegistrationEnabled
      });
    } catch (e) {
      console.error(e);
      return c.json({ enabledProviders: ['email_password'], passwordPolicy: { minLength: 8 }, selfRegistrationEnabled: true }); // Fallback
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
           const policy = config.passwordPolicy as any;
           if (policy?.minLength && password.length < policy.minLength) {
                return c.json({ error: `Password must be at least ${policy.minLength} characters.` }, 400);
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
      
      return c.json({ id: newUser.id.toString(), email: newUser.email });
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
import { getConfiguredGoogleProvider } from './utils';

app.get('/api/auth/google', async (c) => {

    const tenantId = c.req.query('tenantId') || 'rj_local';
    
    try {
        const google = await getConfiguredGoogleProvider(tenantId);
        const state = JSON.stringify({ tenantId });
        return c.redirect(google.getAuthUrl(state));
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

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
        const session = await createSession(user);
        
        // Redirect to Frontend Callback with token
        // In a real app, strict allowlist for redirect URLs should be enforced per tenant
        return c.redirect(`http://localhost:3000/auth/callback?token=${session.token}`);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});
