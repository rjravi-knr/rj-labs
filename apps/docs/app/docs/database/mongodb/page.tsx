"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Layers, TrendingUp, FileText, AlertCircle } from "lucide-react"

export default function MongoDBPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white opacity-50">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-muted-foreground">
              MongoDB + Mongoose
            </h1>
            <p className="text-muted-foreground">Document database for analytics, logs, and flexible schemas</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge variant="outline">Phase 2</Badge>
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-600">Coming Soon</Badge>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Phase 2 - In Development
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            MongoDB integration is planned for Phase 2. This module will provide document database capabilities
            for use cases that benefit from flexible schemas and horizontal scaling.
          </p>
          <p className="text-sm text-muted-foreground">
            Phase 1 (PostgreSQL + Multi-Tenancy) is complete. MongoDB support will be added next.
          </p>
        </CardContent>
      </Card>

      {/* Planned Features */}
      <Card>
        <CardHeader>
          <CardTitle>Planned Features</CardTitle>
          <CardDescription>What's coming in Phase 2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Analytics Model</p>
                <p className="text-xs text-muted-foreground">Track user events, page views, and custom analytics</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Logs Model</p>
                <p className="text-xs text-muted-foreground">Application logs, audit trails, and system events</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Repository Pattern</h4>
            <p className="text-xs text-muted-foreground">
              Base repository with automatic tenant filtering, just like SQL queries.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Database-per-Tenant</h4>
            <p className="text-xs text-muted-foreground">
              Support for giving each tenant their own MongoDB database for high-volume scenarios.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Planned API Preview */}
      <Card>
        <CardHeader>
          <CardTitle>API Preview</CardTitle>
          <CardDescription>How it will work (subject to change)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Analytics Model</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { createDatabase } from '@labs/database'
import { Analytics } from '@labs/database/mongo'

const db = createDatabase()

// Create analytics event (auto-scoped to tenant)
await db.mongo.Analytics.create({
  eventType: 'page_view',
  userId: 'user-123',
  metadata: {
    page: '/dashboard',
    referrer: '/login',
  },
})

// Query analytics (auto-filtered by tenant)
const events = await db.mongo.Analytics.find({
  eventType: 'page_view',
  timestamp: { $gte: lastWeek },
})`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Logs Model</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { Logs } from '@labs/database/mongo'

// Log application event
await db.mongo.Logs.create({
  level: 'info',
  message: 'User logged in',
  userId: 'user-123',
  metadata: {
    ip: request.ip,
    userAgent: request.userAgent,
  },
})

// Query logs with aggregation
const errorStats = await db.mongo.Logs.aggregate([
  { $match: { level: 'error' } },
  { $group: { _id: '$errorCode', count: { $sum: 1 } } },
])`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
          <CardDescription>When to use MongoDB vs PostgreSQL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">✓ Use MongoDB for:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Analytics and event tracking (high write volume)</li>
              <li>Application logs and audit trails</li>
              <li>User activity streams</li>
              <li>Semi-structured data with varying schemas</li>
              <li>Time-series data with TTL indexes</li>
              <li>Documents that need complex nested structures</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">Use PostgreSQL for:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>User accounts and authentication</li>
              <li>Billing and payment data</li>
              <li>Relational data with foreign keys</li>
              <li>Data requiring ACID transactions</li>
              <li>Structured data with complex queries and joins</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Development Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Mongoose client setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Analytics model with tenant filtering</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Logs model with TTL indexes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Base repository pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Database-per-tenant support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Phase 1 (PostgreSQL + Multi-Tenancy) is complete and available for use.
            MongoDB integration (Phase 2) will begin after the SQL foundation is battle-tested
            in production. Check back soon for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
