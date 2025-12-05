import { createSqlClient } from './sql/client'
import { createMongoClient } from './mongo'
import { createCacheClient } from './cache'
import type { DatabaseConfig } from './core/types'
import { getConfig } from './core/config'

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
 * // Use MongoDB (Phase 2)
 * // const analytics = await db.mongo.Analytics.find()
 * 
 * // Use Redis cache (Phase 3)
 * // await db.cache.set('key', 'value')
 * ```
 */
export function createDatabase(config?: DatabaseConfig) {
  const resolvedConfig = getConfig(config)

  return {
    sql: createSqlClient(resolvedConfig.sql),
    // MongoDB and Redis will be enabled in Phase 2 & 3
    // mongo: createMongoClient(resolvedConfig.mongo),
    // cache: createCacheClient(resolvedConfig.cache),
  }
}

export type Database = ReturnType<typeof createDatabase>
