import { pgTable, uuid, varchar, timestamp, uniqueIndex, jsonb } from 'drizzle-orm/pg-core'
import { users } from './users'

/**
 * Accounts table - stores Oauth/Provider links for users
 */
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'oauth', 'email', etc.
  provider: varchar('provider', { length: 50 }).notNull(), // 'google', 'github'
  providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
  accessToken: varchar('access_token'), // Store securely?
  refreshToken: varchar('refresh_token'),
  expiresAt: timestamp('expires_at'),
  tokenType: varchar('token_type', { length: 50 }),
  scope: varchar('scope', { length: 255 }),
  idToken: varchar('id_token'), // JWT
  sessionState: varchar('session_state', { length: 255 }),
  metadata: jsonb('metadata'), // Extra provider data
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  providerUnique: uniqueIndex('provider_unique_idx').on(t.provider, t.providerAccountId),
}))

export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
