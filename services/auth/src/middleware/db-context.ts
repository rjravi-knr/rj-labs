import { createMiddleware } from 'hono/factory';
import { getTenantDb } from '@labs/database';
import { User, Session } from '@labs/auth';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'; // Direct import or infer

// Infer the Return Type of getTenantDb instead of using the factory Database type
type TenantDatabase = ReturnType<typeof getTenantDb>;

// Extend Hono Env for Context Types
export type AuthEnv = {
    Variables: {
        db: TenantDatabase;
        tenantId: string;
        user?: User; // Will be set by AuthGuard
        session?: Session; // Will be set by AuthGuard
    };
};

/**
 * Middleware to resolve Tenant ID and attach Database to Context
 */
export const dbContext = createMiddleware<AuthEnv>(async (context, next) => {
    // 1. Try to get tenantId from Query
    let tenantId = context.req.query('tenantId');

    // 2. If not in query, try body (for POST/PATCH) - careful not to consume stream unless necessary
    //    For now, relying on Query param as standard or 'default' fallback
    
    if (!tenantId) {
        // Fallback or Error? 
        // For multi-tenant, we usually enforce it, but let's default to 'default' if missing for safety
        tenantId = 'default';
    }

    try {
        const db = getTenantDb(tenantId);
        context.set('db', db);
        context.set('tenantId', tenantId);
    } catch (e) {
        console.error('Failed to connect to tenant db', e);
        return context.json({ error: 'Database connection failed' }, 500);
    }

    try {
        await next();
    } catch (e) {
        console.error('[DbContext] Unhandled Error:', e);
        throw e;
    }
});
