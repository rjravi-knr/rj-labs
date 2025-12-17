/**
 * Database configuration types
 */
export interface DatabaseConfig {
  sql?: SqlConfig
  mongo?: MongoConfig
  cache?: CacheConfig
}

export interface SqlConfig {
  url: string;
  maxConnections?: number;
  ssl?: boolean;
}

export interface MongoConfig {
  uri?: string
  dbName?: string
}

export interface CacheConfig {
  url?: string
  keyPrefix?: string
}

/**
 * Tenant context types
 */
export interface TenantContext {
  tenantId: string
  schema?: string
}

/**
 * Common query options
 */
export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

/**
 * Pagination result
 */
export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export type Database = any;
