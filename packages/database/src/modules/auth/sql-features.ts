
import { pgTable, uuid, varchar, timestamp, jsonb, boolean, uniqueIndex } from 'drizzle-orm/pg-core'

/**
 * Feature Flags table - stores feature toggles per tenant
 */
export const featureFlags = pgTable('feature_flags', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 255 }).notNull(),
  value: jsonb('value').notNull(), // Can be boolean true/false or configuration object
  description: varchar('description', { length: 255 }),
  isEnabled: boolean('is_enabled').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
    keyIdx: uniqueIndex('feature_key_idx').on(t.key),
}))

export type FeatureFlag = typeof featureFlags.$inferSelect
export type NewFeatureFlag = typeof featureFlags.$inferInsert
