import { serve } from '@hono/node-server';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

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
        <div class="links">
          <a href="/doc">OpenAPI Spec</a>
          <a href="/docs">API Documentation</a>
        </div>
      </body>
    </html>
  `);
});

// Hello Route (Test)
app.openapi(
  createRoute({
    method: 'get',
    path: '/api/hello',
    responses: {
      200: {
        description: 'Respond with a hello message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({ message: 'Hello from Hono Auth Service!' });
  }
);

// OpenAPI Spec
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'RJ Suite Auth Service API',
    description: 'Authentication service powered by Hono.',
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
