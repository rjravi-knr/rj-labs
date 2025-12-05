import type { DatabaseConfig } from './types'

/**
 * Get database configuration from environment variables or provided config
 */
export function getConfig(overrides?: DatabaseConfig): Required<DatabaseConfig> {
  return {
    sql: {
      connectionString: overrides?.sql?.connectionString ?? process.env.DATABASE_URL ?? '',
      schema: overrides?.sql?.schema,
      poolSize: overrides?.sql?.poolSize ?? 10,
    },
    mongo: {
      uri: overrides?.mongo?.uri ?? process.env.MONGODB_URL ?? '',
      dbName: overrides?.mongo?.dbName,
    },
    cache: {
      url: overrides?.cache?.url ?? process.env.REDIS_URL ?? '',
      keyPrefix: overrides?.cache?.keyPrefix ?? 'labs:',
    },
  }
}

/**
 * Validate required configuration
 */
export function validateConfig(config: DatabaseConfig, required: ('sql' | 'mongo' | 'cache')[]) {
  const errors: string[] = []

  if (required.includes('sql') && !config.sql?.connectionString) {
    errors.push('SQL connection string is required (DATABASE_URL)')
  }

  if (required.includes('mongo') && !config.mongo?.uri) {
    errors.push('MongoDB URI is required (MONGODB_URL)')
  }

  if (required.includes('cache') && !config.cache?.url) {
    errors.push('Redis URL is required (REDIS_URL)')
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`)
  }
}
