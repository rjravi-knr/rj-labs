# @labs/database

Multi-database abstraction layer with built-in multi-tenancy support for RJ Suite applications.

## Features

- **PostgreSQL** with Drizzle ORM (Phase 1 ✅)
- **MongoDB** with Mongoose (Phase 2 - Coming Soon)
- **Redis** with ioredis (Phase 3 - Coming Soon)
- **Multi-Tenancy** with automatic tenant scoping
- **Type-Safe** queries with full TypeScript support
- **Transaction** support for ACID operations

## Installation

This package is part of the RJ Suite monorepo. Install dependencies at the root:

```bash
npm install
```

## Quick Start

### 1. Set up environment variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
MONGODB_URL=mongodb://localhost:27017/mydb
REDIS_URL=redis://localhost:6379
```

### 2. Initialize the database

```typescript
import { createDatabase } from '@labs/database'

const db = createDatabase()
```

### 3. Set tenant context (in middleware or request handler)

```typescript
import { setTenantContext } from '@labs/database'

// Extract tenant from request (subdomain, JWT, header, etc.)
const tenantId = 'tenant-uuid-123'
setTenantContext(tenantId)
```

### 4. Query data (automatically tenant-scoped)

```typescript
import { findUserByEmail, createUser } from '@labs/database'

// Queries are automatically filtered by tenant
const user = await findUserByEmail(db.sql, 'user@example.com')

// Creates are automatically scoped to current tenant
const newUser = await createUser(db.sql, {
  email: 'newuser@example.com',
  name: 'New User',
})
```

## Usage Examples

### Create a Tenant

```typescript
import { createTenant } from '@labs/database'

const tenant = await createTenant(db.sql, {
  slug: 'acme-corp',
  name: 'Acme Corporation',
  tier: 'pro',
})
```

### Multi-Tenant User Management

```typescript
import { setTenantContext, createUser, getAllUsersForTenant } from '@labs/database'

// Set tenant context
setTenantContext(tenant.id)

// Create user (automatically associated with tenant)
const user = await createUser(db.sql, {
  email: 'admin@acme.com',
  name: 'Admin User',
  passwordHash: '...', // Use proper password hashing
})

// Get all users for current tenant
const users = await getAllUsersForTenant(db.sql)
```

### Transactions

```typescript
import { withTransaction, createTenant, createUser } from '@labs/database'

await withTransaction(db.sql, async (tx) => {
  // Create tenant
  const tenant = await createTenant(tx, {
    slug: 'startup',
    name: 'New Startup',
  })

  // Set context for this transaction
  setTenantContext(tenant.id)

  // Create admin user
  await createUser(tx, {
    email: 'founder@startup.com',
    name: 'Founder',
  })

  // Both operations committed together
})
```

### Using with Next.js Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setTenantContext, findTenantBySlug, createDatabase } from '@labs/database'

export async function middleware(request: NextRequest) {
  const db = createDatabase()
  
  // Extract tenant from subdomain
  const hostname = request.headers.get('host') || ''
  const tenantSlug = hostname.split('.')[0]
  
  // Find tenant
  const tenant = await findTenantBySlug(db.sql, tenantSlug)
  
  if (!tenant || !tenant.isActive) {
    return NextResponse.redirect(new URL('/404', request.url))
  }
  
  // Set tenant context for all subsequent queries
  setTenantContext(tenant.id)
  
  return NextResponse.next()
}
```

## API Reference

### Core Functions

- `createDatabase(config?)` - Initialize database clients
- `setTenantContext(tenantId, schema?)` - Set current tenant
- `getTenantContext()` - Get current tenant context
- `withTenant(tenantId, fn)` - Run function in tenant context
- `withTransaction(db, fn)` - Execute transaction

### Tenant Queries

- `findTenantById(db, id)` - Find tenant by ID
- `findTenantBySlug(db, slug)` - Find tenant by slug
- `createTenant(db, data)` - Create new tenant
- `getAllActiveTenants(db)` - Get all active tenants

### User Queries (Tenant-Scoped)

- `findUserById(db, id)` - Find user by ID
- `findUserByEmail(db, email)` - Find user by email
- `createUser(db, data)` - Create new user
- `getAllUsersForTenant(db)` - Get all users for current tenant

## Migrations

Generate migration files:

```bash
npm run db:generate --filter=@labs/database
```

Run migrations:

```bash
npm run db:migrate --filter=@labs/database
```

Open Drizzle Studio (visual database browser):

```bash
npm run db:studio --filter=@labs/database
```

## Multi-Tenancy Strategy

This package uses **row-level tenancy** by default:
- All tenant data shares the same database schema
- Each row has a `tenant_id` foreign key
- Queries automatically filter by current tenant context
- Cost-effective and easy to manage

**Future**: Schema-per-tenant support for enterprise clients (Phase 4)

## Roadmap

- ✅ **Phase 1**: PostgreSQL + Drizzle + Multi-Tenancy
- 🚧 **Phase 2**: MongoDB + Mongoose
- 🚧 **Phase 3**: Redis + ioredis
- 🚧 **Phase 4**: Advanced features (schema-per-tenant, performance optimization)

## License

MIT
