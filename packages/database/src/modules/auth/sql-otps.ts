import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core'

/**
 * OTP Sessions table - stores active OTPs
 */
export const otpSessions = pgTable('otp_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: varchar('tenant_id', { length: 256 }).notNull(),
  identifier: varchar('identifier', { length: 256 }).notNull(), // email or phone
  code: varchar('code', { length: 20 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // login, verification, reset
  channel: varchar('channel', { length: 50 }).notNull(), // email, sms
  attempts: integer('attempts').default(0).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type OtpSessionModel = typeof otpSessions.$inferSelect
export type NewOtpSession = typeof otpSessions.$inferInsert
