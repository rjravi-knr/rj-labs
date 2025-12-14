import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './sql/index'; // You might need to split schema exports later if they grow
/**
 * Cache for database connections to prevent connection leaks
 */
const connectionCache = new Map();
/**
 * Manages database connections for Multi-Database architecture
 */
export class ConnectionManager {
    /**
     * Get the Common Control Database (rj_common)
     */
    static getCommonDb() {
        if (connectionCache.has('common')) {
            return connectionCache.get('common');
        }
        // In a real app, load from env: DATABASE_URL_COMMON
        const connectionString = process.env.DATABASE_URL_COMMON || process.env.DATABASE_URL;
        if (!connectionString)
            throw new Error('DATABASE_URL_COMMON not found');
        const client = postgres(connectionString);
        const db = drizzle(client, { schema });
        connectionCache.set('common', db);
        return db;
    }
    /**
     * Get a Tenant-Specific Database
     * In a real system, this would look up the connection string from 'rj_common.tenants'
     * For this simulated/MVP, we might use the same DB or a convention.
     */
    static getTenantDb(tenantId) {
        // Check cache
        if (connectionCache.has(tenantId)) {
            return connectionCache.get(tenantId);
        }
        // SIMULATION: In reality, fetch connection string for tenantId from rj_common.tenants
        // For local dev, we assume a convention: DATABASE_URL points to the server, we verify the DB name.
        // Base URL structure: postgres://user:pass@host:port
        // We want to append /tenant_db_name
        const baseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432';
        // Hacky parse for dev convenience
        const urlObj = new URL(baseUrl);
        // Map tenantId to db name (convert - to _)
        const dbName = tenantId.replace(/-/g, '_');
        urlObj.pathname = `/${dbName}`;
        const finalUrl = urlObj.toString();
        const client = postgres(finalUrl);
        const db = drizzle(client, { schema });
        connectionCache.set(tenantId, db);
        return db;
    }
}
