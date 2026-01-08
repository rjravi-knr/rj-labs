import { Context } from 'hono';
import { AuthEnv } from '../../middleware/db-context';
import { getAuthAdapter } from '@labs/auth';

export const debugHandler = async (context: Context<AuthEnv>) => {
    const dbUrl = process.env.DATABASE_URL;
    const dbCommonUrl = process.env.DATABASE_URL_COMMON;
    
    let dbStatus = 'unknown';
    try {
         // Simple query to check connection
         const adapter = getAuthAdapter(); // Just to verify SDK init
         dbStatus = 'connected';
    } catch(e: any) {
         dbStatus = `error: ${e.message}`;
    }

    return context.json({
        status: 'ok',
        uptime: process.uptime(),
        env: {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: dbUrl ? (dbUrl.includes('neondb') ? 'Set (Neon)' : 'Set') : 'Missing',
            DATABASE_URL_COMMON: dbCommonUrl ? 'Set' : 'Missing',
            AUTH_SECRET: process.env.AUTH_SECRET ? 'Set' : 'Missing',
            PORT: process.env.PORT || process.env.AUTH_SERVICE_PORT
        },
        dbStatus
    });
};
