import { serve } from '@hono/node-server';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { extendZodWithOpenApi } from '@hono/zod-openapi';

extendZodWithOpenApi(z);
import { apiReference } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { initializeAuth, signIn } from '@labs/auth';
import { DrizzleAdapter } from '@labs/auth/adapters';

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
app.openapi(
  createRoute({
    method: 'post',
    path: '/api/auth/login',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email(),
              password: z.string().min(1),
              tenantId: z.string().min(1).default('acme-corp')
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
