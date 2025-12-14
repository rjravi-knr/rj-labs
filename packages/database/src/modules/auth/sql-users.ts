import { pgTable, uuid, varchar, timestamp, boolean, bigint } from 'drizzle-orm/pg-core'


/**
 * Users table - stores user accounts with tenant association
 */
export const users = pgTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  tenantId: varchar('tenant_id', { length: 32 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),

  passwordHash: varchar('password_hash', { length: 255 }),
  

  isSuperAdmin: boolean('is_super_admin').default(true).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  resetToken: varchar('reset_token', { length: 255 }),
  resetTokenExpires: timestamp('reset_token_expires', { mode: 'date' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
