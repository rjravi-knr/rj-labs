import { pgTable, uuid, varchar, timestamp, text, bigint } from 'drizzle-orm/pg-core'
import { users } from './sql-users'

/**
 * Sessions table - stores user session data
 */
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tenantId: varchar('tenant_id', { length: 256 }).notNull(), // Track which tenant this session belongs to
  token: varchar('token', { length: 255 }).unique().notNull(),
  authMethod: varchar('auth_method', { length: 50 }), // Track authentication method (email_password, google, github, etc.)
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
