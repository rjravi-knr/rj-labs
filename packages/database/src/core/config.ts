import type { SqlConfig } from './types';

// Mock configs for development
export const rjCommonConfig: SqlConfig = {
    url: process.env.DATABASE_URL_COMMON || '',
    ssl: false,
};

export const getTenantConfig = (tenantId: string): SqlConfig => {
    return {
        url: process.env.DATABASE_URL || '', // Default to main DB
        ssl: false,
    };
};

// Helper to resolve full config
export const getConfig = (config?: Partial<import('./types').DatabaseConfig>) => {
    return {
        sql: config?.sql || rjCommonConfig,
        mongo: config?.mongo || {},
        cache: config?.cache || {},
    };
};
