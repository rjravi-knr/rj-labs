// Mock configs for development
export const rjCommonConfig = {
    url: process.env.DATABASE_URL_COMMON || '',
    ssl: false,
};
export const getTenantConfig = (tenantId) => {
    return {
        url: process.env.DATABASE_URL || '', // Default to main DB
        ssl: false,
    };
};
// Helper to resolve full config
export const getConfig = (config) => {
    return {
        sql: (config === null || config === void 0 ? void 0 : config.sql) || rjCommonConfig,
        mongo: (config === null || config === void 0 ? void 0 : config.mongo) || {},
        cache: (config === null || config === void 0 ? void 0 : config.cache) || {},
    };
};
