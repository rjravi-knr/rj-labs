"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Rocket, Database, Server, Key } from "lucide-react"

export default function SetupPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <Rocket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Setup Guide
              </span>
            </h1>
            <p className="text-muted-foreground">Get started with @labs/database in your app</p>
          </div>
        </div>
      </div>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>1.</span>
            Install the Package
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            The database package is already available in the monorepo. No installation needed if you're working within the monorepo.
          </p>
          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// In your app's package.json, it's already listed:
{
  "dependencies": {
    "@labs/database": "workspace:*"
  }
}`}
          </pre>
          <p className="text-xs text-muted-foreground">
            Run `pnpm install` at the monorepo root to ensure all dependencies are linked.
          </p>
        </CardContent>
      </Card>

      {/* Environment Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>2.</span>
            Configure Environment Variables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Create a `.env` file in your app's directory with database connection strings:
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">PostgreSQL (Required for Phase 1)</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`# PostgreSQL Connection
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"`}
            </pre>
            <p className="text-xs text-muted-foreground">
              For local development, you can use Docker:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`docker run -d \\
  --name postgres \\
  -e POSTGRES_PASSWORD=password \\
  -e POSTGRES_DB=myapp \\
  -p 5432:5432 \\
  postgres:16`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">MongoDB (Phase 2 - Optional)</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`# MongoDB Connection
MONGODB_URL="mongodb://localhost:27017/myapp"`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Redis (Phase 3 - Optional)</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`# Redis Connection
REDIS_URL="redis://localhost:6379"`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Run Migrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>3.</span>
            Run Database Migrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generate and run migrations to create the database schema:
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Generate Migration Files</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`# From monorepo root
pnpm run db:generate --filter=@labs/database`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Apply Migrations</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`pnpm run db:migrate --filter=@labs/database`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Verify (Optional)</h4>
            <p className="text-xs text-muted-foreground">Open Drizzle Studio to visually inspect your database:</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`pnpm run db:studio --filter=@labs/database
# Opens at http://localhost:4983`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Initialize in App */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>4.</span>
            Initialize Database in Your App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Create a database singleton for your app:
          </p>

          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// lib/db.ts
import { createDatabase } from '@labs/database'

export const db = createDatabase()

// Use throughout your app
export { setTenantContext, getTenantContext } from '@labs/database'
export * from '@labs/database/sql'`}
          </pre>
        </CardContent>
      </Card>

      {/* Setup Middleware */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>5.</span>
            Setup Tenant Middleware (For Multi-Tenancy)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you're building a multi-tenant SaaS, set up middleware to handle tenant routing:
          </p>

          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// middleware.ts (Next.js App Router)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { db, setTenantContext, findTenantBySlug } from './lib/db'

export async function middleware(request: NextRequest) {
  // Extract tenant from subdomain
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  
  // Skip for localhost
  if (subdomain === 'localhost' || hostname.includes('localhost')) {
    return NextResponse.next()
  }
  
  // Find tenant by slug
  const tenant = await findTenantBySlug(db.sql, subdomain)
  
  if (!tenant || !tenant.isActive) {
    return NextResponse.redirect(new URL('/404', request.url))
  }
  
  // Set tenant context for this request
  setTenantContext(tenant.id)
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>6.</span>
            Start Using in Your App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Now you can use the database in your app:
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Server Components (Next.js)</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// app/users/page.tsx
import { db, getAllUsersForTenant } from '@/lib/db'

export default async function UsersPage() {
  // Automatically scoped to current tenant
  const users = await getAllUsersForTenant(db.sql)
  
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">API Routes</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db, createUser } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Tenant context already set by middleware
  const user = await createUser(db.sql, {
    email: body.email,
    name: body.name,
  })
  
  return NextResponse.json(user)
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Connection Errors</h4>
            <p className="text-xs text-muted-foreground">
              If you get connection errors, verify your DATABASE_URL is correct and the database is running:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT version();"`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Migration Errors</h4>
            <p className="text-xs text-muted-foreground">
              If migrations fail, check that the database exists and you have the correct permissions.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Tenant Context Errors</h4>
            <p className="text-xs text-muted-foreground">
              If you get "Tenant context is not set" errors, make sure your middleware is running before database queries.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Now that you have the database set up, explore:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span>→</span>
              <a href="/docs/database/sql" className="text-primary hover:underline">
                SQL / PostgreSQL Documentation
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span>→</span>
              <a href="/docs/database/multi-tenancy" className="text-primary hover:underline">
                Multi-Tenancy Guide
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span>→</span>
              <a href="/docs/database" className="text-primary hover:underline">
                Database Overview
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
