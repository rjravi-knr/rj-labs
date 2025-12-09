import { eq } from 'drizzle-orm'
import type { SqlClient } from '../client'
import { tenants, type Tenant, type NewTenant } from '../../modules/tenancy/sql'

/**
 * Find tenant by ID
 */
export async function findTenantById(db: SqlClient, id: string): Promise<Tenant | undefined> {
  return db.query.tenants.findFirst({
    where: eq(tenants.id, id),
  })
}

/**
 * Find tenant by slug
 */
export async function findTenantBySlug(db: SqlClient, slug: string): Promise<Tenant | undefined> {
  const result = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1)
  return result[0]
}

/**
 * Create a new tenant
 */
export async function createTenant(db: SqlClient, data: NewTenant): Promise<Tenant> {
  const result = await db.insert(tenants).values(data).returning()
  return result[0]!
}

/**
 * Get all active tenants
 */
export async function getAllActiveTenants(db: SqlClient): Promise<Tenant[]> {
  return db.select().from(tenants).where(eq(tenants.isActive, true))
}
