import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './src/modules/auth/*.ts', // Scans auth module (users, sessions, accounts)
  out: './src/sql/migrations/tenant',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
} satisfies Config
