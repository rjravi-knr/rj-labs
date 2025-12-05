import type { SqlClient } from './client'

/**
 * Execute a function within a database transaction
 */
export async function withTransaction<T>(
  db: SqlClient,
  fn: (tx: Parameters<Parameters<SqlClient['transaction']>[0]>[0]) => Promise<T>
): Promise<T> {
  return db.transaction(fn)
}
