import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './src/modules/tenancy/sql.ts',
  out: './src/sql/migrations/common',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_COMMON || process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
} satisfies Config
