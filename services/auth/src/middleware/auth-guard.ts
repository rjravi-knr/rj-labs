import { createMiddleware } from 'hono/factory';
import { HttpStatus } from '@labs/utils';
import { getTenantDb } from '@labs/database';
import { validateSession, getUser } from '@labs/auth';
import { AuthErrorCodes, AuthErrorMessages } from '../constants/errors';
import { AuthEnv } from './db-context';

/**
 * Middleware to protect routes requiring authentication
 */
export const authGuard = createMiddleware<AuthEnv>(async (context, next) => {
    const authHeader = context.req.header('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
        return context.json({ 
            error: AuthErrorMessages[AuthErrorCodes.TOKEN_MISSING], 
            code: AuthErrorCodes.TOKEN_MISSING 
        }, HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return context.json({ 
            error: AuthErrorMessages[AuthErrorCodes.TOKEN_MISSING], 
            code: AuthErrorCodes.TOKEN_MISSING 
        }, HttpStatus.UNAUTHORIZED);
    }

    try {
        const session = await validateSession(token);
        if (!session) {
            return context.json({ 
                error: AuthErrorMessages[AuthErrorCodes.TOKEN_INVALID], 
                code: AuthErrorCodes.TOKEN_INVALID 
            }, HttpStatus.UNAUTHORIZED);
        }

        // Attach Session
        context.set('session', session);

        // Optional: Fetch User if needed extensively, but Session usually enough for simple checks.
        // For standard "User Context", let's fetch it.
        // NOTE: We assume 'db' is already available from dbContext!
        // Use the Session's tenant to find the User
        const userTenantId = session.tenantId;
        const user = await getUser(session.userId, userTenantId!);

        // If the context tenant is 'default' (unspecified), switch to the User's tenant
        if (context.var.tenantId === 'default' && userTenantId) {
             context.set('tenantId', userTenantId);
             context.set('db', getTenantDb(userTenantId));
        }

        if (!user) {
            return context.json({ 
                error: AuthErrorMessages[AuthErrorCodes.USER_NOT_FOUND], 
                code: AuthErrorCodes.USER_NOT_FOUND 
            }, HttpStatus.UNAUTHORIZED);
        }

        context.set('user', user);
        await next();
    } catch (e: any) {
        console.error('[AuthGuard] Error:', e);
        return context.json({ error: 'Authentication failed', details: e.message || String(e) }, HttpStatus.UNAUTHORIZED);
    }
});

/**
 * Middleware to require Super Admin privileges
 */
export const superAdminGuard = createMiddleware<AuthEnv>(async (context, next) => {
    // Must run AFTER authGuard
    const user = context.var.user;
    
    if (!user) {
         return context.json({ error: 'Unauthorized' }, HttpStatus.UNAUTHORIZED);
    }

    if (!user.isSuperAdmin) {
        return context.json({ 
            error: AuthErrorMessages[AuthErrorCodes.FORBIDDEN], 
            code: AuthErrorCodes.FORBIDDEN 
        }, HttpStatus.FORBIDDEN);
    }

    await next();
});
