import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { AuthEnv } from '../../middleware/db-context';
import { AuthPaths } from '../../constants/paths';
import { ConfigQuerySchema, ConfigResponseSchema, UpdateConfigBodySchema, UpdateConfigResponseSchema } from './schema';
import { getConfigHandler, updateConfigHandler } from './handlers';
import { authGuard } from '../../middleware/auth-guard';
import { ErrorSchema } from '../auth/schema';

const configRouter = new OpenAPIHono<AuthEnv>();

// GET /config
configRouter.openapi(
    createRoute({
        method: 'get',
        path: AuthPaths.CONFIG,
        request: {
            query: ConfigQuerySchema
        },
        responses: {
            200: {
                description: 'Tenant Auth Configuration',
                content: { 'application/json': { schema: ConfigResponseSchema } }
            },
            500: {
                 description: 'Server Error',
                 content: { 'application/json': { schema: ErrorSchema } }
            }
        }
    }),
    getConfigHandler as any
);

// PATCH /config
configRouter.openapi(
    createRoute({
        method: 'patch',
        path: AuthPaths.CONFIG,
        security: [{ BearerAuth: [] }],
        request: {
            query: ConfigQuerySchema,
            body: {
                content: {
                    'application/json': { schema: UpdateConfigBodySchema }
                }
            }
        },
        responses: {
            200: {
                description: 'Config Updated',
                content: { 'application/json': { schema: UpdateConfigResponseSchema } }
            },
            403: {
                description: 'Forbidden',
                content: { 'application/json': { schema: ErrorSchema } }
            },
            500: {
                description: 'Server Error',
                content: { 'application/json': { schema: ErrorSchema } }
            }
        }
    }),
    authGuard as any,
    updateConfigHandler as any
);

export default configRouter;
