import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { AuthEnv } from '../../middleware/db-context';
import { AuthPaths } from '../../constants/paths';
import { DebugResponseSchema } from './schema';
import { debugHandler } from './handlers';

const systemRouter = new OpenAPIHono<AuthEnv>();

// GET /debug
systemRouter.openapi(
    createRoute({
        method: 'get',
        path: AuthPaths.DEBUG,
        responses: {
            200: {
                description: 'System Status',
                content: { 'application/json': { schema: DebugResponseSchema } }
            }
        }
    }),
    debugHandler as any
);

// GET /health
systemRouter.openapi(
    createRoute({
        method: 'get',
        path: '/health',
        responses: {
            200: {
                description: 'Health Check',
                content: { 'application/json': { schema: z.object({ status: z.string() }) } }
            }
        }
    }),
    (context) => context.json({ status: 'ok' }, 200)
);

export default systemRouter;
import { z } from '@hono/zod-openapi';
