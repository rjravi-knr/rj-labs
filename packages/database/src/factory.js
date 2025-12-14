import { getCommonDb } from './sql/client';
import { createMongoClient } from './mongo/client';
import { LogsRepository } from './mongo/repositories';
import { getConfig } from './core/config';
/**
 * Create a unified database instance with SQL, MongoDB, and Redis clients
 *
 * @example
 * ```typescript
 * import { createDatabase } from '@labs/database'
 *
 * const db = createDatabase()
 *
 * // Use SQL client
 * const users = await db.sql.select().from(users)
 *
 * // Use MongoDB for logs (Phase 2)
 * await db.mongo.logs.create({
 *   level: 'info',
 *   message: 'User logged in',
 *   context: 'auth',
 * })
 *
 * // Use Redis cache (Phase 3 - coming soon)
 * // await db.cache.set('key', 'value')
 * ```
 */
export function createDatabase(config) {
    const resolvedConfig = getConfig(config);
    // MongoDB is optional - only initialize if URI is provided
    let mongoInstance;
    if (resolvedConfig.mongo.uri) {
        // Connection is lazy - happens on first query
        createMongoClient(resolvedConfig.mongo).catch((err) => {
            console.warn('MongoDB connection deferred:', err.message);
        });
        mongoInstance = {
            logs: new LogsRepository(),
        };
    }
    return {
        sql: getCommonDb(),
        mongo: mongoInstance,
        // Redis will be enabled in Phase 3
        // cache: createCacheClient(resolvedConfig.cache),
    };
}
