import { ConnectionManager } from '../connection-manager'

// Re-export type for convenience
export type SqlClient = ReturnType<typeof ConnectionManager.getCommonDb>

/**
 * Get the Common Control Database
 */
export const getCommonDb = ConnectionManager.getCommonDb

/**
 * Get a Tenant Database
 */
export const getTenantDb = ConnectionManager.getTenantDb
