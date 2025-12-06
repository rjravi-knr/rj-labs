export type AuthMethod = 'email_password' | 'google' | 'github' | 'magic_link'

export interface TenantAuthConfig {
  methods: AuthMethod[]
  allowSignup: boolean
  requireEmailVerification: boolean
}

const DEFAULT_CONFIG: TenantAuthConfig = {
  methods: ['email_password', 'google', 'github'],
  allowSignup: true,
  requireEmailVerification: false
}

export const getTenantAuthenticationConfig = async (tenantId: string): Promise<TenantAuthConfig> => {
  // TODO: Fetch from database (tenant.metadata.auth)
  return DEFAULT_CONFIG
}
