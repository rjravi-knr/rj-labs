"use client"

import Link from "next/link"
import { Button } from "@labs/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { 
  Database, Users, Lock, Code, Zap, CircleDot,
  CheckCircle, ArrowRight, Layers, Shield
} from "lucide-react"

const databaseFeatures = [
  {
    icon: Database,
    title: "PostgreSQL + Drizzle",
    status: "complete",
    description: "Type-safe SQL queries with Drizzle ORM. ACID transactions, migrations, and automatic type inference.",
    examples: ["createUser()", "findTenantBySlug()", "withTransaction()"],
    href: "/docs/database/sql",
    color: "from-blue-500 to-cyan-500",
    phase: "Phase 1"
  },
  {
    icon: Users,
    title: "Multi-Tenancy",
    status: "complete",
    description: "Row-level tenant isolation using AsyncLocalStorage. Automatic data scoping per request.",
    examples: ["setTenantContext()", "getTenantContext()", "withTenant()"],
    href: "/docs/database/multi-tenancy",
    color: "from-purple-500 to-pink-500",
    phase: "Phase 1"
  },
  {
    icon: Layers,
    title: "MongoDB + Mongoose",
    status: "planned",
    description: "Document database for analytics, logs, and flexible schemas. Database-per-tenant support.",
    examples: ["Analytics", "Logs", "Events"],
    href: "/docs/database/mongodb",
    color: "from-green-500 to-emerald-500",
    phase: "Phase 2"
  },
  {
    icon: Zap,
    title: "Redis + ioredis",
    status: "planned",
    description: "In-memory caching, sessions, rate limiting, and pub/sub messaging with key prefixing.",
    examples: ["SessionCache", "RateLimiter", "PubSub"],
    href: "/docs/database/redis",
    color: "from-orange-500 to-red-500",
    phase: "Phase 3"
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "complete":
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Available</Badge>
    case "planned":
      return <Badge variant="outline">Coming Soon</Badge>
    default:
      return null
  }
}

export default function DatabasePage() {
  return (
    <div className="relative flex flex-col">
      {/* Hero Section */}
      <section className="relative border-b py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              @labs/database
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Database Package
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Multi-database abstraction layer with built-in multi-tenancy for scalable SaaS applications.
              PostgreSQL, MongoDB, and Redis in one unified package.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Multi-Tenancy</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Type-Safe Queries</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Auto Data Scoping</span>
              </div>
            </div>

            {/* Quick Install */}
            <div className="mt-8">
              <div className="mx-auto max-w-lg rounded-lg border bg-muted/50 p-4">
                <p className="mb-2 text-sm text-muted-foreground">Install in your project:</p>
                <code className="rounded bg-black px-3 py-2 text-sm text-green-400 dark:bg-white dark:text-green-600">
                  pnpm add @labs/database
                </code>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/docs/database/setup">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs/database/sql">
                <Button size="lg" variant="outline">
                  View SQL Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Database Features */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Database Modules</h2>
            <p className="mt-2 text-muted-foreground">
              Polyglot persistence with unified API and multi-tenancy
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {databaseFeatures.map((feature, index) => {
              const isAvailable = feature.status === "complete"
              
              return (
                <Link key={index} href={feature.href}>
                  <Card className={`group h-full transition-all ${isAvailable ? 'hover:scale-[1.02] hover:shadow-lg hover:border-primary/50' : 'opacity-75'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(feature.status)}
                          <Badge variant="secondary" className="text-xs">
                            {feature.phase}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className={`mt-4 ${isAvailable ? 'group-hover:text-primary transition-colors' : ''}`}>
                        {feature.title}
                      </CardTitle>
                      <CardDescription>
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {isAvailable ? 'Available:' : 'Planned:'}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {feature.examples.map((example, i) => (
                            <code 
                              key={i}
                              className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground"
                            >
                              {example}
                            </code>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Why @labs/database?</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    Built-in Multi-Tenancy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatic tenant data isolation using AsyncLocalStorage. Set tenant context once per request and all queries are automatically scoped. Prevents data leakage between tenants.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-500" />
                    Type-Safe Queries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Full TypeScript support with Drizzle ORM. Compile-time type checking, autocomplete, and zero runtime overhead. Catch errors before they reach production.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircleDot className="h-5 w-5 text-green-500" />
                    Polyglot Persistence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use the right database for the right job. PostgreSQL for transactional data, MongoDB for analytics, Redis for caching. Unified API across all databases.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Production Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Battle-tested patterns with connection pooling, transactions, migrations, and comprehensive error handling. Ready for enterprise SaaS applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Example */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Quick Example</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Tenant User Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">Set tenant context in middleware:</p>
                    <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { createDatabase, setTenantContext } from '@labs/database'

// In middleware
const db = createDatabase()
const tenant = await findTenantBySlug(db.sql, subdomain)
setTenantContext(tenant.id)  // Set once per request`}
                    </pre>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">Queries are automatically tenant-scoped:</p>
                    <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { createUser, getAllUsersForTenant } from '@labs/database'

// Create user (auto-adds current tenant_id)
const user = await createUser(db.sql, {
  email: 'user@acme.com',
  name: 'John Doe',
})

// Query users (auto-filtered by tenant)
const users = await getAllUsersForTenant(db.sql)`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Development Roadmap</h2>
            
            <div className="space-y-4">
              <Card className="border-green-500/50 bg-green-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Phase 1: PostgreSQL + Multi-Tenancy
                    </CardTitle>
                    <Badge className="bg-green-500/10 text-green-600">Complete</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Drizzle ORM integration</li>
                    <li>✓ Row-level multi-tenancy</li>
                    <li>✓ Tenant-aware queries</li>
                    <li>✓ Transaction support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircleDot className="h-5 w-5 text-muted-foreground" />
                    Phase 2: MongoDB Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>○ Mongoose setup</li>
                    <li>○ Analytics model</li>
                    <li>○ Logs model</li>
                    <li>○ Repository pattern</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircleDot className="h-5 w-5 text-muted-foreground" />
                    Phase 3: Redis Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>○ Session caching</li>
                    <li>○ Rate limiting</li>
                    <li>○ Pub/sub messaging</li>
                    <li>○ Key prefixing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
