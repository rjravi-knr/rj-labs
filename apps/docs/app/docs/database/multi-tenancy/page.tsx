"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import {Badge } from "@labs/ui/badge"
import { Shield, Users, Lock, GitBranch } from "lucide-react"

export default function MultiTenancyPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Multi-Tenancy
              </span>
            </h1>
            <p className="text-muted-foreground">Automatic tenant data isolation and scoping</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge className="bg-green-500/10 text-green-600">Phase 1</Badge>
          <Badge className="bg-purple-500/10 text-purple-600">Row-Level</Badge>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>What is Multi-Tenancy?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Multi-tenancy allows a single application instance to serve multiple organizations (tenants)
            while keeping their data completely isolated. Each tenant's data is automatically scoped to prevent
            data leakage between organizations.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Lock className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Data Isolation</p>
               <p className="text-xs text-muted-foreground">Complete tenant separation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Users className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Auto-Scoping</p>
                <p className="text-xs text-muted-foreground">Queries filter automatically</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Shield className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Security</p>
                <p className="text-xs text-muted-foreground">Prevents data leakage</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <GitBranch className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Scalable</p>
                <p className="text-xs text-muted-foreground">Grow to any size</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>AsyncLocalStorage-based tenant context</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The database package uses Node.js AsyncLocalStorage to maintain tenant context per request.
            Set the tenant once at the beginning of a request, and all subsequent database queries 
            are automatically scoped to that tenant.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Set Tenant Context (Middleware)</h4>
              <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// app/middleware.ts
import { setTenantContext, findTenantBySlug } from '@labs/database'

export async function middleware(request: NextRequest) {
  const db = createDatabase()
  
  // Extract tenant from subdomain
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  
  // Find tenant by slug
  const tenant = await findTenantBySlug(db.sql, subdomain)
  
  if (!tenant) {
    return NextResponse.redirect('/404')
  }
  
  // Set tenant context for this request
  setTenantContext(tenant.id)
  
  return NextResponse.next()
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. Queries Are Auto-Scoped</h4>
              <p className="text-sm text-muted-foreground mb-2">
                All tenant-aware queries automatically filter by the current tenant:
              </p>
              <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// app/users/page.tsx
import { getAllUsersForTenant } from '@labs/database'

// This query only returns users for the current tenant
// The tenant_id filter is added automatically!
const users = await getAllUsersForTenant(db.sql)

// Same for creates - tenant_id is injected automatically
const newUser = await createUser(db.sql, {
  email: 'user@acme.com',
  name: 'John Doe',
})`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Context API */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant Context API</CardTitle>
          <CardDescription>Managing tenant context programmatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-semibold">setTenantContext(tenantId, schema?)</h4>
            <p className="text-sm text-muted-foreground">Set the current tenant for this request</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { setTenantContext } from '@labs/database'

// Basic usage
setTenantContext('tenant-uuid-123')

// With custom schema (schema-per-tenant, future Phase 4)
setTenantContext('tenant-uuid-123', 'tenant_acme')`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">getTenantContext()</h4>
            <p className="text-sm text-muted-foreground">Get the current tenant context (or undefined)</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { getTenantContext } from '@labs/database'

const context = getTenantContext()
if (context) {
  console.log('Current tenant:', context.tenantId)
  console.log('Schema:', context.schema)  // Optional
}`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">requireTenantContext()</h4>
            <p className="text-sm text-muted-foreground">Get tenant context or throw error if not set</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { requireTenantContext } from '@labs/database'

// Throws TenantContextError if not set
const context = requireTenantContext()
console.log('Current tenant:', context.tenantId)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">withTenant(tenantId, fn)</h4>
            <p className="text-sm text-muted-foreground">Run a function with a specific tenant context</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { withTenant, getAllUsersForTenant } from '@labs/database'

// Temporarily switch tenant for a specific operation
const results = await withTenant('different-tenant-id', async () => {
  return await getAllUsersForTenant(db.sql)
})

// Context automatically restored after function completes`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">✓ Do</h4>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Set tenant context in middleware before any database queries</li>
              <li>Use tenant-aware query helpers (they filter automatically)</li>
              <li>Validate tenant access in API routes</li>
              <li>Use `requireTenantContext()` in critical operations</li>
              <li>Test with multiple tenants to ensure isolation</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-red-600">✗ Don't</h4>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Manually add tenant_id to every query (use helpers instead)</li>
              <li>Forget to set tenant context (queries will fail or return wrong data)</li>
              <li>Mix tenant data in the same request</li>
              <li>Trust client-provided tenant IDs without validation</li>
              <li>Bypass tenant scoping for "admin" operations (use proper admin flows)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Security Considerations */}
      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-600" />
            Security Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold">Tenant Verification</h4>
            <p className="text-sm text-muted-foreground">
              Always verify that the authenticated user has access to the requested tenant.
              Don't trust tenant IDs from URL parameters or headers without validation.
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Verify user belongs to tenant
const user = await getCurrentUser()
if (user.tenantId !== requestedTenantId) {
  throw new Error('Unauthorized')
}

setTenantContext(user.tenantId)`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Testing Data Isolation</h4>
            <p className="text-sm text-muted-foreground">
              Always test your multi-tenant implementation with multiple tenants to ensure
              queries never leak data between tenants.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Future: Schema-per-Tenant */}
      <Card>
        <CardHeader>
          <CardTitle>Future: Schema-per-Tenant (Phase 4)</CardTitle>
          <CardDescription>Enterprise-grade tenant isolation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            In Phase 4, we'll add support for schema-per-tenant, where each tenant gets their own
            PostgreSQL schema. This provides stronger isolation and is ideal for:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Enterprise clients requiring complete data isolation</li>
            <li>Compliance requirements (GDPR, SOC2, HIPAA)</li>
            <li>Tenants with custom schema extensions</li>
            <li>High-volume tenants needing dedicated resources</li>
          </ul>
          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Phase 4 (Coming Soon)
setTenantContext('enterprise-tenant', {
  schema: 'tenant_acme',  // Dedicated schema
  poolSize: 50,           // Dedicated connection pool
})`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
