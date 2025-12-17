
import { pgTable, uuid, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core'

/**
 * Auth Config table - stores authentication settings per tenant
 * Only one row should exist per tenant (enforced by application logic or singleton pattern)
 */
export const authConfig = pgTable('auth_config', {
    // Log execution to debug loading
    ...(() => { console.log('[DATABASE] Loading authConfig schema definition WITH emailPolicy'); return {}; })(),
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
  emailPolicy: jsonb('email_policy'), // Stores EmailPolicy interface
  settings: jsonb('settings'), // Flexible settings for theme, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const authConfigHistory = pgTable('auth_config_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  configId: uuid('config_id').references(() => authConfig.id).notNull(),
  snapshot: jsonb('snapshot').notNull(),
  changedBy: varchar('changed_by', { length: 255 }), // User ID or "system"
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type AuthConfig = typeof authConfig.$inferSelect
export type NewAuthConfig = typeof authConfig.$inferInsert
