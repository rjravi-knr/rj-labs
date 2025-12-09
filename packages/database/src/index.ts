/**
 * @labs/database
 * 
 * Multi-database abstraction layer with multi-tenancy support for RJ Suite.
 * Supports PostgreSQL, MongoDB, and Redis with unified API.
 * 
 * @module
 */

// Core exports
export * from './core/types'
export * from './core/config'
export * from './core/errors'

// Multi-tenancy
export * from './modules/tenancy'

// Database adapters
export * from './sql'
export * from './mongo'
export * from './cache'

// Unified database factory
export { createDatabase, type Database } from './factory'
