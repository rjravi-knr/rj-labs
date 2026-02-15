import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Platform Core Service API',
      version: '1.0.0',
      description: 'API documentation for the Platform Core Service',
    },
    servers: [
      {
        url: 'http://localhost:8001',
        description: 'Development server',
      },
      {
          url: 'http://localhost:3000/api/platform', /* Via Next.js Proxy if applicable */
          description: 'Via Gateway/Proxy'
      }
    ],
  },
  apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../models/*.ts')], // Path to the API docs
};

export const openApiSpecification = swaggerJsdoc(options);
