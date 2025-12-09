import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/modules/**/sql*.ts',
  out: './src/sql/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
