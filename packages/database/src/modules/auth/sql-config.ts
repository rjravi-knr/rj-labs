
import { pgTable, uuid, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core'

/**
 * Auth Config table - stores authentication settings per tenant
 * Only one row should exist per tenant (enforced by application logic or singleton pattern)
 */
export const authConfig = pgTable('auth_config', {
  id: uuid('id').primaryKey().defaultRandom(),
  enabledProviders: jsonb('enabled_providers').notNull().default(['email_password']), // Array of strings
  providerConfig: jsonb('provider_config'), // Client IDs, etc.
  ssoConfig: jsonb('sso_config'), // SAML/OIDC metadata
  passwordPolicy: jsonb('password_policy').default({ minLength: 8 }),
  otpPolicy: jsonb('otp_policy'), // Global OTP settings (length, expiry)
  pinPolicy: jsonb('pin_policy'), // Global PIN settings
  loginMethods: jsonb('login_methods'), // simplified enablement matrix
  mfaEnabled: boolean('mfa_enabled').default(false).notNull(),

  selfRegistrationEnabled: boolean('self_registration_enabled').default(true).notNull(),

  termsUrl: varchar('terms_url', { length: 512 }),
  privacyUrl: varchar('privacy_url', { length: 512 }),
  name: varchar('name', { length: 255 }),
  settings: jsonb('settings'), // Flexible settings for theme, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type AuthConfig = typeof authConfig.$inferSelect
export type NewAuthConfig = typeof authConfig.$inferInsert
