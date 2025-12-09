import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import type { SqlConfig } from '../core/types'
import { ConnectionError } from '../core/errors'
import * as schema from './index'

/**
 * Create a PostgreSQL client with Drizzle ORM
 */
export function createSqlClient(config?: SqlConfig) {
  try {
    const connectionString = config?.connectionString ?? process.env.DATABASE_URL

    if (!connectionString) {
      throw new ConnectionError('Database connection string is required (DATABASE_URL)')
    }

    // Create postgres.js client
    const client = postgres(connectionString, {
      max: config?.poolSize ?? 10,
      prepare: false, // Better for serverless
    })

    // Create Drizzle instance with schema
    const db = drizzle(client, { schema })

    return db
  } catch (error) {
    throw new ConnectionError(
      'Failed to create SQL client',
      error instanceof Error ? error : undefined
    )
  }
}

export type SqlClient = ReturnType<typeof createSqlClient>
