import 'dotenv/config';
import { OpenAPIHono } from '@hono/zod-openapi';
import { extendZodWithOpenApi, z } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { initializeAuth, DEFAULT_PASSWORD_POLICY } from '@labs/auth';
import { DrizzleAdapter } from '@labs/auth/adapters';
import { dbContext } from './middleware/db-context';
import appRouter from './routes';
import { apiReference } from '@scalar/hono-api-reference';

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

// Global Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', dbContext); // Attach DB to every request

// Landing Page
app.get('/', (context) => {
  return context.html(`
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

// Mount Routes
app.route('/', appRouter);

// Documentation
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Auth Service API',
  },
});

app.get('/docs', apiReference({
  spec: {
    url: '/doc',
  },
}));

export default app;
