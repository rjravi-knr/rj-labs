"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Zap, Clock, TrendingUp, MessageSquare, AlertCircle } from "lucide-react"

export default function RedisPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white opacity-50">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-muted-foreground">
              Redis + ioredis
            </h1>
            <p className="text-muted-foreground">In-memory caching, sessions, and real-time messaging</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge variant="outline">Phase 3</Badge>
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-600">Coming Soon</Badge>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Phase 3 - In Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Redis integration is planned for Phase 3, after MongoDB support is complete. This module will provide
            high-performance caching, session management, rate limiting, and pub/sub messaging.
          </p>
          <p className="text-sm text-muted-foreground">
            Current status: Phase 1 (PostgreSQL) is complete, Phase 2 (MongoDB) is in development.
          </p>
        </CardContent>
      </Card>

      {/* Planned Features */}
      <Card>
        <CardHeader>
          <CardTitle>Planned Features</CardTitle>
          <CardDescription>What's coming in Phase 3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Session Management</p>
                <p className="text-xs text-muted-foreground">Fast session storage with automatic tenant prefixing</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Rate Limiting</p>
                <p className="text-xs text-muted-foreground">Per-user and per-tenant rate limiting</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <MessageSquare className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Pub/Sub Messaging</p>
                <p className="text-xs text-muted-foreground">Real-time event broadcasting</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Zap className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Caching Layer</p>
                <p className="text-xs text-muted-foreground">Query result caching with TTL</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planned API Preview */}
      <Card>
        <CardHeader>
          <CardTitle>API Preview</CardTitle>
          <CardDescription>How it will work (subject to change)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Session Caching</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { createDatabase } from '@labs/database'
import { SessionCache } from '@labs/database/cache'

const db = createDatabase()
const sessions = new SessionCache(db.cache)

// Store session (auto-prefixed with tenant)
await sessions.set('user-123', {
  userId: 'user-123',
  email: 'user@acme.com',
  roles: ['user'],
}, 3600) // 1 hour TTL

// Get session
const session = await sessions.get('user-123')

// Delete session
await sessions.delete('user-123')`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Rate Limiting</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { RateLimiter } from '@labs/database/cache'

const limiter = new RateLimiter(db.cache)

// Check rate limit (auto-scoped to tenant)
const allowed = await limiter.check('user-123', {
  maxRequests: 100,
  windowMs: 60000, // 1 minute
})

if (!allowed) {
  throw new Error('Rate limit exceeded')
}`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Pub/Sub Messaging</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { PubSub } from '@labs/database/cache'

const pubsub = new PubSub(db.cache)

// Subscribe to tenant events
await pubsub.subscribe('user:created', (data) => {
  console.log('New user:', data)
})

// Publish event (tenant-scoped)
await pubsub.publish('user:created', {
  userId: 'user-123',
  email: 'user@acme.com',
})`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Query Caching</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Cache database queries
const cacheKey = 'users:active'
const cached = await db.cache.get(cacheKey)

if (cached) {
  return JSON.parse(cached)
}

const users = await getAllUsersForTenant(db.sql)
await db.cache.setex(cacheKey, 300, JSON.stringify(users)) // 5 min

return users`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
          <CardDescription>When to use Redis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Session storage for logged-in users</li>
            <li>API rate limiting (per-user, per-IP, per-tenant)</li>
            <li>Caching expensive database queries</li>
            <li>Real-time notifications and events</li>
            <li>Temporary data with automatic expiration (OTP codes, reset tokens)</li>
            <li>Leaderboards and counters</li>
            <li>Distributed locks for background jobs</li>
          </ul>
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
              <span className="text-sm">ioredis client setup with key prefixing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Session cache with tenant isolation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Rate limiter utilities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Pub/sub helpers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <span className="text-sm">Query caching layer</span>
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
            Redis integration (Phase 3) is planned after MongoDB support (Phase 2) is complete.
            We're ensuring each database layer is production-ready before moving to the next.
            Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
