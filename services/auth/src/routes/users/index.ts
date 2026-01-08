import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { AuthEnv } from '../../middleware/db-context';
import { AuthPaths } from '../../constants/paths';
import { UserQuerySchema, UserListSchema, UserDetailSchema, UserIdParamSchema, CreateUserBodySchema, CreateUserResponseSchema } from './schema';
import { listUsersHandler, getUserHandler, createUserHandler } from './handlers';
import { authGuard } from '../../middleware/auth-guard';
import { ErrorSchema } from '../auth/schema';

const usersRouter = new OpenAPIHono<AuthEnv>();

// GET /users
usersRouter.openapi(
    createRoute({
        method: 'get',
        path: AuthPaths.USERS,
        security: [{ BearerAuth: [] }],
        request: {
            query: UserQuerySchema
        },
        responses: {
            200: {
                description: 'List of users',
                content: { 'application/json': { schema: UserListSchema } }
            },
            403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
            401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
            500: { description: 'Server Error', content: { 'application/json': { schema: ErrorSchema } } }
        }
    }),
    authGuard as any,
    listUsersHandler as any
);

// GET /users/:userId
usersRouter.openapi(
    createRoute({
        method: 'get',
        path: `${AuthPaths.USERS}/{userId}`,
        security: [{ BearerAuth: [] }],
        request: {
            params: UserIdParamSchema,
            query: UserQuerySchema
        },
        responses: {
             200: {
                description: 'Detailed user information',
                content: { 'application/json': { schema: UserDetailSchema } }
            },
            404: { description: 'User not found', content: { 'application/json': { schema: ErrorSchema } } },
            403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
            500: { description: 'Server Error', content: { 'application/json': { schema: ErrorSchema } } }
        }
    }),
    authGuard as any,
    getUserHandler as any
);

// POST /users
usersRouter.openapi(
    createRoute({
        method: 'post',
        path: AuthPaths.USERS,
        security: [{ BearerAuth: [] }],
        request: {
            query: UserQuerySchema,
            body: {
                content: {
                    'application/json': { schema: CreateUserBodySchema }
                }
            }
        },
        responses: {
             200: {
                description: 'User Created',
                content: { 'application/json': { schema: CreateUserResponseSchema } }
            },
            400: { description: 'Bad Request', content: { 'application/json': { schema: ErrorSchema } } },
            403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
            500: { description: 'Server Error', content: { 'application/json': { schema: ErrorSchema } } }
        }
    }),
    authGuard as any,
    createUserHandler as any
);

export default usersRouter;
