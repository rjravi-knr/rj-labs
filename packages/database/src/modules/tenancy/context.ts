import { AsyncLocalStorage } from 'node:async_hooks'

export interface TenantContext {
  tenantId: string
}

export const tenantContext = new AsyncLocalStorage<TenantContext>()

export function getTenantContext() {
  return tenantContext.getStore()
}
