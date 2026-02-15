import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiReference } from '@scalar/express-api-reference';
import { openApiSpecification } from './config/swagger';
import healthRoutes from './routes/health';

const app = express();

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

// Scalar API Reference
app.use(
  '/docs',
  apiReference({
    spec: {
      content: openApiSpecification,
    },
  }),
);

export default app;
