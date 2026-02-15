import swaggerJsdoc from 'swagger-jsdoc';

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
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to the API docs
};

export const openApiSpecification = swaggerJsdoc(options);
