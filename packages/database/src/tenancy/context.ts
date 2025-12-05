import { AsyncLocalStorage } from 'async_hooks'
import { TenantContextError } from '../core/errors'
import type { TenantContext } from '../core/types'

/**
 * Async local storage for tenant context
 */
const tenantStorage = new AsyncLocalStorage<TenantContext>()

/**
 * Set the current tenant context
 */
export function setTenantContext(tenantId: string, schema?: string): void {
  const context: TenantContext = { tenantId, schema }
  tenantStorage.enterWith(context)
}

/**
 * Get the current tenant context
 */
export function getTenantContext(): TenantContext | undefined {
  return tenantStorage.getStore()
}

/**
 * Get the current tenant ID (throws if not set)
 */
export function requireTenantContext(): TenantContext {
  const context = getTenantContext()
  if (!context) {
    throw new TenantContextError('Tenant context is not set. Call setTenantContext() first.')
  }
  return context
}

/**
 * Run a function within a specific tenant context
 */
export async function withTenant<T>(
  tenantId: string,
  fn: () => Promise<T>,
  schema?: string
): Promise<T> {
  const context: TenantContext = { tenantId, schema }
  return tenantStorage.run(context, fn)
}

/**
 * Clear the current tenant context
 */
export function clearTenantContext(): void {
  tenantStorage.disable()
}
