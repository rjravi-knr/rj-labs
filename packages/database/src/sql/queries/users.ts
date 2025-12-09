import { eq, and } from 'drizzle-orm'
import type { SqlClient } from '../client'
import { users, type User, type NewUser } from '../../modules/auth/sql-users'
import { getTenantContext } from '../../modules/tenancy/context'

/**
 * Find user by ID (tenant-scoped)
 */
export async function findUserById(db: SqlClient, id: number, tenant: { tenantId: string }): Promise<User | undefined> {
  return db.query.users.findFirst({
    where: and(eq(users.id, id), eq(users.tenantId, tenant.tenantId)),
  })
}

/**
 * Find user by email (tenant-scoped)
 */
export async function findUserByEmail(db: SqlClient, email: string): Promise<User | undefined> {
  const tenant = getTenantContext()
  const conditions = tenant
    ? and(eq(users.email, email), eq(users.tenantId, tenant.tenantId))
    : eq(users.email, email)

  const result = await db.select().from(users).where(conditions).limit(1)
  return result[0]
}

/**
 * Create a new user (auto-scoped to current tenant)
 */
export async function createUser(db: SqlClient, data: Omit<NewUser, 'tenantId'>): Promise<User> {
  const tenant = getTenantContext()
  if (!tenant) {
    throw new Error('Tenant context is required to create a user')
  }

  const result = await db.insert(users).values({
    ...data,
    tenantId: tenant.tenantId,
  }).returning()
  
  return result[0]!
}

/**
 * Get all users for the current tenant
 */
export async function getAllUsersForTenant(db: SqlClient): Promise<User[]> {
  const tenant = getTenantContext()
  if (!tenant) {
    throw new Error('Tenant context is required')
  }

  return db.select().from(users).where(eq(users.tenantId, tenant.tenantId))
}
