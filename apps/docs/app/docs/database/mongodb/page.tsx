"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card"
import { Badge } from "@labs/ui/badge"
import { Layers, Database, FileText, Code, Shield, Zap } from "lucide-react"

export default function MongoDBPage() {
  return (
    <div className="relative flex flex-col space-y-8 pb-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                MongoDB + Mongoose
              </span>
            </h1>
            <p className="text-muted-foreground">Document database for analytics, logs, and flexible schemas</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge className="bg-green-500/10 text-green-600">Phase 2</Badge>
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
            The MongoDB module provides a document database powered by Mongoose ORM. It includes
            pre-built models for logs and analytics, automatic tenant scoping via the repository pattern,
            and support for flexible schemas.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Shield className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Tenant-Aware</p>
                <p className="text-xs text-muted-foreground">Auto-scoped queries</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Code className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Type-Safe</p>
                <p className="text-xs text-muted-foreground">Full TypeScript support</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Zap className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Repositories</p>
                <p className="text-xs text-muted-foreground">Extensible base class</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Database className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Mongoose</p>
                <p className="text-xs text-muted-foreground">Powerful ODM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup & Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Setup & Connection</CardTitle>
          <CardDescription>Initialize MongoDB client</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Environment Variables</h4>
            <p className="text-sm text-muted-foreground">
              Set your MongoDB connection string:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`# .env
MONGODB_URL=mongodb://localhost:27017/myapp
# or for MongoDB Atlas:
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/myapp`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Client Initialization</h4>
            <p className="text-sm text-muted-foreground">
              The client connects lazily when first query is executed:
            </p>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { createMongoClient } from '@labs/database/mongo'

// Auto-connects using MONGODB_URL env variable
const mongoose = await createMongoClient()

// Or with custom config
const mongoose = await createMongoClient({
  uri: 'mongodb://localhost:27017',
  dbName: 'myapp',
})

// Check connection status
import { isMongoConnected } from '@labs/database/mongo'
console.log(isMongoConnected()) // true/false`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Mongoose Models */}
      <Card>
        <CardHeader>
          <CardTitle>Mongoose Models</CardTitle>
          <CardDescription>Pre-built schemas for common use cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logs Model */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Logs Model</h3>
            <p className="text-sm text-muted-foreground">Application logging with TTL auto-deletion</p>
            <pre className="rounded-lg bg-slate-950 p-4 text-xs text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { Log, LogLevel, type ILog } from '@labs/database/mongo'

// Schema
interface ILog {
  tenantId: string
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  message: string
  context?: string           // e.g., 'auth', 'api', 'database'
  metadata?: Record<string, any>
  userId?: string
  errorStack?: string
  timestamp: Date
  createdAt: Date
}

// Indexes
- { tenantId: 1, level: 1, timestamp: -1 }
- { tenantId: 1, context: 1, timestamp: -1 }
- { createdAt: 1 } with TTL (90 days auto-delete)`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Repository Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Repository Pattern</CardTitle>
          <CardDescription>BaseRepository with automatic tenant scoping</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            All repositories extend BaseRepository, which automatically filters queries by the current tenant context.
          </p>
          <div className="space-y-3">
            <h4 className="font-semibold">Using LogsRepository</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { LogsRepository, LogLevel } from '@labs/database/mongo'
import { setTenantContext } from '@labs/database'

// Set tenant context (usually from middleware)
setTenantContext('tenant-uuid-123')

// Create repository instance
const logsRepo = new LogsRepository()

// All queries are automatically scoped to current tenant!
const errorLogs = await logsRepo.findErrors(100)
const recentLogs = await logsRepo.getRecent(50)
const apiLogs = await logsRepo.findByContext('api')`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* CRUD Operations */}
      <Card>
        <CardHeader>
          <CardTitle>CRUD Operations</CardTitle>
          <CardDescription>Tenant-scoped database operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Create Documents</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { LogsRepository, LogLevel } from '@labs/database/mongo'

const logsRepo = new LogsRepository()

// Create single log (tenantId auto-added)
await logsRepo.create({
  level: LogLevel.INFO,
  message: 'User logged in',
  context: 'auth',
  userId: 'user-123',
  metadata: {
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
  },
})

// Create multiple logs
await logsRepo.createMany([
  { level: LogLevel.ERROR, message: 'API error', context: 'api' },
  { level: LogLevel.WARN, message: 'Slow query', context: 'database' },
])`}
            </pre>
          </div>

          {/* Read */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Query Documents</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Find all (tenant-scoped)
const allLogs = await logsRepo.find()

// Find with filter
const errorLogs = await logsRepo.find({ 
  level: LogLevel.ERROR 
})

// Find one
const log = await logsRepo.findOne({ 
  userId: 'user-123' 
})

// Find by ID (tenant-scoped)
const log = await logsRepo.findById('log-id-123')

// Count documents
const errorCount = await logsRepo.count({ 
  level: LogLevel.ERROR 
})`}
            </pre>
          </div>

          {/* Update */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Update Documents</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Update (tenant-scoped)
await logsRepo.update(
  { userId: 'user-123' },
  { $set: { metadata: { updated: true } } }
)`}
            </pre>
          </div>

          {/* Delete */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Delete Documents</h3>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Delete (tenant-scoped)
const deleted = await logsRepo.delete({ 
  level: LogLevel.DEBUG 
})
// Returns true if deleted, false otherwise`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Specialized Log Queries</CardTitle>
          <CardDescription>LogsRepository custom methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Filter by Level</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Get error logs
const errors = await logsRepo.findErrors(100)

// Get by specific level
const warnings = await logsRepo.findByLevel(LogLevel.WARN, 50)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Filter by Context</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Get auth-related logs
const authLogs = await logsRepo.findByContext('auth', 100)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Date Range Queries</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`const startDate = new Date('2024-01-01')
const endDate = new Date('2024-01-31')

// All logs in range
const logs = await logsRepo.findByDateRange(startDate, endDate)

// Only errors in range
const errors = await logsRepo.findByDateRange(
  startDate, 
  endDate, 
  LogLevel.ERROR
)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Search Logs</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Case-insensitive message search
const results = await logsRepo.search('login failed', 100)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Aggregations</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`// Get error counts by context
const stats = await logsRepo.getErrorCountByContext()
// Returns: [{ context: 'api', count: 45 }, ...]`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Creating Custom Repositories */}
      <Card>
        <CardHeader>
          <CardTitle>Creating Custom Repositories</CardTitle>
          <CardDescription>Extend BaseRepository for your own models</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Create custom repositories by extending BaseRepository. All CRUD methods will automatically
            include tenant filtering.
          </p>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Step 1: Define Model</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { Schema, model, type Document } from 'mongoose'

interface IUserEvent extends Document {
  tenantId: string
  eventType: string
  userId: string
  metadata?: Record<string, any>
  timestamp: Date
}

const UserEventSchema = new Schema<IUserEvent>({
  tenantId: { type: String, required: true, index: true },
  eventType: { type: String, required: true },
  userId: { type: String, required: true, index: true },
  metadata: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now, index: true },
})

export const UserEvent = model<IUserEvent>('UserEvent', UserEventSchema)`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Step 2: Create Repository</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { BaseRepository } from '@labs/database/mongo'
import { UserEvent, type IUserEvent } from './models'

class UserEventsRepository extends BaseRepository<IUserEvent> {
  constructor() {
    super(UserEvent)
  }

  // Add custom methods
  async findByEventType(type: string) {
    return this.find({ eventType: type })
  }

  async findByUserId(userId: string) {
    return this.find({ userId })
  }

  async getEventStats() {
    const { getTenantContext } = await import('@labs/database')
    const context = getTenantContext()
    
    return this.model.aggregate([
      { $match: { tenantId: context?.tenantId } },
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
  }
}

export const userEventsRepo = new UserEventsRepository()`}
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Step 3: Use It!</h4>
            <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { setTenantContext } from '@labs/database'
import { userEventsRepo } from './repositories'

setTenantContext('tenant-123')

// Auto-scoped to tenant-123
await userEventsRepo.create({
  eventType: 'page_view',
  userId: 'user-456',
  metadata: { page: '/dashboard' },
})

const pageViews = await userEventsRepo.findByEventType('page_view')
const stats = await userEventsRepo.getEventStats()`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Advanced: Direct Mongoose Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced: Direct Mongoose Usage</CardTitle>
          <CardDescription>Use Mongoose directly for complex queries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For complex queries beyond the repository pattern, use Mongoose models directly.
          </p>
          <pre className="rounded-lg bg-slate-950 p-4 text-sm text-slate-50 dark:bg-slate-900 overflow-x-auto">
{`import { Log, LogLevel } from '@labs/database/mongo'
import { getTenantContext } from '@labs/database'

const context = getTenantContext()

// Complex aggregation
const pipeline = await Log.aggregate([
  { $match: { tenantId: context.tenantId, level: LogLevel.ERROR } },
  { 
    $group: { 
      _id: { 
        context: '$context', 
        date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }
      },
      count: { $sum: 1 },
      errors: { $push: '$message' }
    } 
  },
  { $sort: { count: -1 } },
  { $limit: 10 }
])

// Geospatial queries, text search, etc.
const results = await Log.find({
  tenantId: context.tenantId,
  $text: { $search: 'database connection' }
})`}
          </pre>
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
    </div>
  )
}
