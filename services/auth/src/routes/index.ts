import { OpenAPIHono } from '@hono/zod-openapi';
import { AuthEnv } from '../middleware/db-context';

import authRouter from './auth';
import configRouter from './config';
import usersRouter from './users';
import systemRouter from './system';

import { AuthPaths } from '../constants/paths';

const appRouter = new OpenAPIHono<AuthEnv>();

// Mount Modules under /api/auth
appRouter.route(AuthPaths.BASE, authRouter);
appRouter.route(AuthPaths.BASE, configRouter);
appRouter.route(AuthPaths.BASE, usersRouter);
appRouter.route(AuthPaths.BASE, systemRouter);

export default appRouter;
