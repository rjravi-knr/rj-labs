import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/sql/schema/*.ts',
  out: './src/sql/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
