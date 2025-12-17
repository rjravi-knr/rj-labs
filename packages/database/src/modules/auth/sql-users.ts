import { pgTable, uuid, varchar, timestamp, boolean, bigint } from 'drizzle-orm/pg-core'


/**
 * Users table - stores user accounts with tenant association
 */
export const users = pgTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  tenantId: varchar('tenant_id', { length: 32 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  
  // Profile Fields
  username: varchar('username', { length: 150 }).unique(),
  firstName: varchar('first_name', { length: 150 }),
  lastName: varchar('last_name', { length: 150 }),
  fullName: varchar('full_name', { length: 255 }), // Replaces name
  displayName: varchar('display_name', { length: 150 }),
  
  memberCode: varchar('member_code', { length: 50 }), // Custom identifier

  passwordHash: varchar('password_hash', { length: 255 }),
  
  isSuperAdmin: boolean('is_super_admin').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  
  // Verification Fields
  emailVerified: boolean('email_verified').default(false).notNull(),
  emailVerifiedTimestamp: timestamp('email_verified_timestamp', { mode: 'date' }),
  
  phoneVerified: boolean('phone_verified').default(false).notNull(),
  phoneVerifiedTimestamp: timestamp('phone_verified_timestamp', { mode: 'date' }),
  
  userVerified: boolean('user_verified').default(false).notNull(),
  userVerifiedTimestamp: timestamp('user_verified_timestamp', { mode: 'date' }),

  resetToken: varchar('reset_token', { length: 255 }),
  resetTokenExpires: timestamp('reset_token_expires', { mode: 'date' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
