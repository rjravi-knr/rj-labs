import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { openApiSpecification } from './config/swagger';
import healthRoutes from './routes/health';

const app: Express = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
        'img-src': ["'self'", 'data:', 'cdn.jsdelivr.net'],
      },
    },
  })
);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/health', healthRoutes);


// Welcome Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Platform Core Service</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #f8fafc;
          color: #0f172a;
        }
        .container {
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          max-width: 500px;
        }
        h1 {
          color: #137FEC;
          margin-bottom: 1rem;
        }
        p {
          color: #64748b;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        .btn {
          display: inline-block;
          background-color: #137FEC;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn:hover {
          background-color: #0E5DB2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome</h1>
        <p>This is the Platform Core Documentation Site.</p>
        <a href="/docs" class="btn">Open Documentation</a>
      </div>
    </body>
    </html>
  `);
});

// Scalar API Reference (Dynamic Import for ESM compatibility)
import('@scalar/express-api-reference').then(({ apiReference }) => {
  app.use(
    '/docs',
    apiReference({
      spec: {
        content: openApiSpecification,
      },
    } as any),
  );
});

export default app;
