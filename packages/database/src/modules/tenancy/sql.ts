import { pgTable, uuid, varchar, timestamp, boolean, jsonb, pgSchema } from 'drizzle-orm/pg-core'


/**
 * Tenants table - stores multi-tenant organization data
 * Note: Lives in 'rj_common' database.
 */
export const tenants = pgTable('tenants', {
  id: varchar('id', { length: 32 }).primaryKey(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  tier: varchar('tier', { length: 50 }).notNull().default('free'),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Tenant = typeof tenants.$inferSelect
export type NewTenant = typeof tenants.$inferInsert
