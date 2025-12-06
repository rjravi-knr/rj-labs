import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/rj_suite'

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const sql = postgres(connectionString, { max: 1 })
  const db = drizzle(sql)

  console.log('⏳ Running migrations...')

  const start = Date.now()
  await migrate(db, { migrationsFolder: 'src/sql/migrations' })
  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  await sql.end()
  process.exit(0)
}

runMigrations().catch((err) => {
  console.error('❌ Migration failed')
  console.error(err)
  process.exit(1)
})
