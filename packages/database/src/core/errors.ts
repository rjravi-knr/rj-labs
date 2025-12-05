/**
 * Base database error
 */
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public cause?: Error
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

/**
 * Connection error
 */
export class ConnectionError extends DatabaseError {
  constructor(message: string, cause?: Error) {
    super(message, 'CONNECTION_ERROR', cause)
    this.name = 'ConnectionError'
  }
}

/**
 * Query error
 */
export class QueryError extends DatabaseError {
  constructor(message: string, cause?: Error) {
    super(message, 'QUERY_ERROR', cause)
    this.name = 'QueryError'
  }
}

/**
 * Tenant context error
 */
export class TenantContextError extends DatabaseError {
  constructor(message: string) {
    super(message, 'TENANT_CONTEXT_ERROR')
    this.name = 'TenantContextError'
  }
}

/**
 * Migration error
 */
export class MigrationError extends DatabaseError {
  constructor(message: string, cause?: Error) {
    super(message, 'MIGRATION_ERROR', cause)
    this.name = 'MigrationError'
  }
}
