import { ConnectionManager } from '../connection-manager';
/**
 * Get the Common Control Database
 */
export const getCommonDb = ConnectionManager.getCommonDb;
/**
 * Get a Tenant Database
 */
export const getTenantDb = ConnectionManager.getTenantDb;
