import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { AuthEnv } from '../../middleware/db-context';
import { AuthPaths } from '../../constants/paths';
import { LoginSchema, LoginResponseSchema, SignupSchema, ErrorSchema, UserResponseSchema } from './schema';
import { loginHandler, signupHandler, meHandler } from './handlers';
import { authGuard } from '../../middleware/auth-guard';

const authRouter = new OpenAPIHono<AuthEnv>();

// POST /login
authRouter.openapi(
    createRoute({
        method: 'post',
        path: AuthPaths.LOGIN,
        request: {
            body: {
                content: {
                    'application/json': { schema: LoginSchema }
                }
            }
        },
        responses: {
            200: {
                description: 'Login successful',
                content: { 'application/json': { schema: LoginResponseSchema } }
            },
            401: {
                description: 'Unauthorized',
                content: { 'application/json': { schema: ErrorSchema } }
            }
        }
    }),
    loginHandler as any
);

// POST /signup
authRouter.openapi(
    createRoute({
        method: 'post',
        path: AuthPaths.SIGNUP,
        request: {
            body: {
                content: {
                    'application/json': { schema: SignupSchema }
                }
            }
        },
        responses: {
            200: {
                description: 'User created',
                content: { 'application/json': { schema: z.object({ id: z.string(), email: z.string() }) as any } } // Cast for simplicity
            },
            400: {
                description: 'Bad Request',
                content: { 'application/json': { schema: ErrorSchema } }
            }
        }
    }),
    signupHandler as any
);

// GET /me
authRouter.openapi(
    createRoute({
        method: 'get',
        path: AuthPaths.ME,
        security: [{ BearerAuth: [] }],
        responses: {
            200: {
                description: 'Current User',
                content: { 'application/json': { schema: z.object({ user: UserResponseSchema }) } }
            },
            401: { description: 'Unauthorized' }
        }
    }),
    authGuard as any, // Apply Guard here!
    meHandler as any
);



export default authRouter;
import { z } from '@hono/zod-openapi'; // Helper for schema above
