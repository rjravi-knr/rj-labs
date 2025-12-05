"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Database, Users, Table, GitBranch, Code } from "lucide-react"

export default function SqlPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                SQL / PostgreSQL
              </span>
            </h1>
            <p className="text-muted-foreground">Type-safe queries with Drizzle ORM and PostgreSQL</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge className="bg-green-500/10 text-green-600">Phase 1</Badge>
          <Badge className="bg-blue-500/10 text-blue-600">Available</Badge>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The SQL module provides a type-safe PostgreSQL client powered by Drizzle ORM. It includes
            pre-built schemas for multi-tenant applications, automatic tenant scoping, and transaction support.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Code className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Type-Safe</p>
                <p className="text-xs text-muted-foreground">Full TypeScript inference</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Users className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Multi-Tenant</p>
                <p className="text-xs text-muted-foreground">Automatic data scoping</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <GitBranch className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Migrations</p>
                <p className="text-xs text-muted-foreground">Schema version control</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Table className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Transactions</p>
                <p className="text-xs text-muted-foreground">ACID compliance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Schemas */}
      <Card>
        <CardHeader>
          <CardTitle>Database Schemas</CardTitle>
          <CardDescription>Pre-built tables for multi-tenant SaaS applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tenants Table */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tenants Table</h3>
            <p className="text-sm text-muted-foreground">Stores organization/workspace data</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { tenants } from '@labs/database/sql'

// Schema
{
  id: uuid (PK)
  slug: string (unique)     // For subdomain routing
  name: string
  tier: 'free' | 'pro' | 'enterprise'
  isActive: boolean
  metadata: jsonb           // Flexible data
  createdAt: timestamp
  updatedAt: timestamp
}`}
            </pre>
          </div>

          {/* Users Table */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Users Table</h3>
            <p className="text-sm text-muted-foreground">User accounts with tenant association</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { users } from '@labs/database/sql'

// Schema
{
  id: uuid (PK)
  tenantId: uuid (FK → tenants.id)
  email: string
  name: string | null
  passwordHash: string | null
  isActive: boolean
  emailVerified: boolean
  createdAt: timestamp
  updatedAt: timestamp
}`}
            </pre>
          </div>

          {/* Sessions Table */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sessions Table</h3>
            <p className="text-sm text-muted-foreground">User session management</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { sessions } from '@labs/database/sql'

// Schema
{
  id: uuid (PK)
  userId: uuid (FK → users.id)
  token: string (unique)
  ipAddress: string | null
  userAgent: text | null
  expiresAt: timestamp
  createdAt: timestamp
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Query Helpers */}
      <Card>
        <CardHeader>
          <CardTitle>Query Helpers</CardTitle>
          <CardDescription>Tenant-aware database operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tenant Queries */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Tenant Queries</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { 
  findTenantById, 
  findTenantBySlug,
  createTenant,
  getAllActiveTenants 
} from '@labs/database'

// Find by ID
const tenant = await findTenantById(db.sql, 'uuid-123')

// Find by slug (for subdomain routing)
const tenant = await findTenantBySlug(db.sql, 'acme-corp')

// Create tenant
const newTenant = await createTenant(db.sql, {
  slug: 'startup-xyz',
  name: 'Startup XYZ',
  tier: 'pro',
})

// Get all active tenants
const tenants = await getAllActiveTenants(db.sql)`}
            </pre>
          </div>

          {/* User Queries */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">User Queries (Tenant-Scoped)</h3>
            <p className="text-sm text-muted-foreground">
              These queries automatically filter by the current tenant context
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { 
  createUser,
  findUserById,
  findUserByEmail,
  getAllUsersForTenant
} from '@labs/database'

// Must have tenant context set first!
setTenantContext('tenant-uuid')

// Find user by ID (only returns if in current tenant)
const user = await findUserById(db.sql, 'user-uuid')

// Find by email (scoped to current tenant)
const user = await findUserByEmail(db.sql, 'user@acme.com')

// Create user (automatically adds current tenant_id)
const newUser = await createUser(db.sql, {
  email: 'newuser@acme.com',
  name: 'Jane Doe',
  passwordHash: await hashPassword('secret'),
})

// Get all users for current tenant
const users = await getAllUsersForTenant(db.sql)`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>ACID-compliant database operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use transactions to ensure data consistency across multiple operations. Either all succeed or all fail.
          </p>
          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { withTransaction, createTenant, createUser } from '@labs/database'

await withTransaction(db.sql, async (tx) => {
  // Create tenant
  const tenant = await createTenant(tx, {
    slug: 'new-company',
    name: 'New Company Inc',
    tier: 'free',
  })
  
  // Set context for this transaction
  setTenantContext(tenant.id)
  
  // Create admin user
  await createUser(tx, {
    email: 'admin@new-company.com',
    name: 'Admin User',
  })
  
  // Both operations committed together
  // If any fails, both are rolled back
})`}
          </pre>
        </CardContent>
      </Card>

      {/* Direct Drizzle Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced: Direct Drizzle Usage</CardTitle>
          <CardDescription>Use Drizzle ORM directly for custom queries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            While query helpers cover common use cases, you can use Drizzle ORM directly for complex queries.
          </p>
          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { createDatabase } from '@labs/database'
import { users, tenants } from '@labs/database/sql'
import { eq, and, count } from 'drizzle-orm'

const db = createDatabase()

// Complex query with joins
const results = await db.sql
  .select({
    tenant: tenants,
    userCount: count(users.id),
  })
  .from(tenants)
  .leftJoin(users, eq(users.tenantId, tenants.id))
  .where(eq(tenants.isActive, true))
  .groupBy(tenants.id)

// Custom filters
const activeUsers = await db.sql
  .select()
  .from(users)
  .where(
    and(
      eq(users.tenantId, currentTenantId),
      eq(users.isActive, true),
      eq(users.emailVerified, true)
    )
  )`}
          </pre>
        </CardContent>
      </Card>

      {/* Migrations */}
      <Card>
        <CardHeader>
          <CardTitle>Migrations</CardTitle>
          <CardDescription>Managing database schema changes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Generate Migrations</h4>
            <p className="text-sm text-muted-foreground">
              When you modify schemas, generate migration files:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`pnpm run db:generate --filter=@labs/database`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Run Migrations</h4>
            <p className="text-sm text-muted-foreground">
              Apply pending migrations to your database:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`pnpm run db:migrate --filter=@labs/database`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Drizzle Studio</h4>
            <p className="text-sm text-muted-foreground">
              Visual database browser:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`pnpm run db:studio --filter=@labs/database
# Opens at http://localhost:4983`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
