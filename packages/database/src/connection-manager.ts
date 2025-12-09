import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import type { SqlConfig } from './core/types'
import * as schema from './sql/index' // You might need to split schema exports later if they grow
import { rjCommonConfig, getTenantConfig } from './core/config' // Hypothetical config loader

/**
 * Cache for database connections to prevent connection leaks
 */
const connectionCache = new Map<string, ReturnType<typeof drizzle>>()

/**
 * Manages database connections for Multi-Database architecture
 */
export class ConnectionManager {
  
  /**
   * Get the Common Control Database (rj_common)
   */
  static getCommonDb() {
    if (connectionCache.has('common')) {
      return connectionCache.get('common')!
    }

    // In a real app, load from env: DATABASE_URL_COMMON
    const connectionString = process.env.DATABASE_URL_COMMON || process.env.DATABASE_URL
    if (!connectionString) throw new Error('DATABASE_URL_COMMON not found')

    const client = postgres(connectionString)
    const db = drizzle(client, { schema })
    
    connectionCache.set('common', db)
    return db
  }

  /**
   * Get a Tenant-Specific Database
   * In a real system, this would look up the connection string from 'rj_common.tenants'
   * For this simulated/MVP, we might use the same DB or a convention.
   */
  static getTenantDb(tenantId: string) {
    // Check cache
    if (connectionCache.has(tenantId)) {
      return connectionCache.get(tenantId)!
    }

    // SIMULATION: In reality, fetch connection string for tenantId
    // For local dev, we might be using the same Postgres instance but ideally different DBs
    // Or we just return the main DB connection if everything is physically co-located for dev.
    
    // Strategy: 
    // 1. Look up config (mocked here or Env var convention)
    // 2. Connect
    
    const connectionString = process.env.DATABASE_URL // Defaulting to main for Dev
    if (!connectionString) throw new Error('DATABASE_URL not found')

    const client = postgres(connectionString)
    const db = drizzle(client, { schema })
    
    connectionCache.set(tenantId, db)
    return db
  }
}
