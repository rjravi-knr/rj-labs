
import { getTenantDb } from '@labs/database';
import { authConfig } from '@labs/database/auth';
import { getAuthAdapter, GoogleProvider } from '@labs/auth';

export async function getConfiguredGoogleProvider(tenantId: string): Promise<GoogleProvider> {
    const db = getTenantDb(tenantId);
    
    // Fetch auth config for tenant
    const [config] = await db.select().from(authConfig).limit(1);

    let clientId = process.env.GOOGLE_CLIENT_ID;
    let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    let redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3002/api/auth/google/callback';

    if (config?.providerConfig) {
        const providers = config.providerConfig as any;
        if (providers.google) {
            if (providers.google.clientId) clientId = providers.google.clientId;
            if (providers.google.clientSecret) clientSecret = providers.google.clientSecret;
            if (providers.google.redirectUri) redirectUri = providers.google.redirectUri;
        }
    }

    if (!clientId || !clientSecret) {
        // Warning or Error? For now logging warning and using mock if explicit
        console.warn(`Missing Google Config for tenant ${tenantId}, using defaults/env`);
        clientId = clientId || 'mock';
        clientSecret = clientSecret || 'mock';
    }

    const adapter = getAuthAdapter();
    return new GoogleProvider(adapter, {
        clientId,
        clientSecret,
        redirectUri
    });
}
