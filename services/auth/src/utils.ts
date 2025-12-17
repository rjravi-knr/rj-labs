
import { getTenantDb } from '@labs/database';
import { authConfig } from '@labs/database/auth';
import { getAuthAdapter, GoogleProvider, GitHubProvider } from '@labs/auth';

export async function getConfiguredGoogleProvider(tenantId: string): Promise<GoogleProvider> {
    const db = getTenantDb(tenantId);
    
    // Fetch auth config for tenant
    const [config] = await db.select().from(authConfig).limit(1);

    let clientId = process.env.GOOGLE_CLIENT_ID;
    let clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    let redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (config?.providerConfig) {
        const providers = config.providerConfig as any;
        if (providers.google) {
            clientId = providers.google.clientId || providers.google.client_id || clientId;
            clientSecret = providers.google.clientSecret || providers.google.client_secret || clientSecret;
            redirectUri = providers.google.redirectUri || providers.google.redirect_uri || redirectUri;
        }
    }

    if (!clientId || !clientSecret || !redirectUri) {
        throw new Error(`Missing Google Config for tenant ${tenantId}. clientId, clientSecret, and redirectUri are required.`);
    }


    const adapter = getAuthAdapter();
    return new GoogleProvider(adapter, {

        clientId,
        clientSecret,
        redirectUri
    });
}

export async function getConfiguredGitHubProvider(tenantId: string): Promise<GitHubProvider> {
    const db = getTenantDb(tenantId);
    
    // Fetch auth config for tenant
    const [config] = await db.select().from(authConfig).limit(1);

    let clientId = process.env.GITHUB_CLIENT_ID;
    let clientSecret = process.env.GITHUB_CLIENT_SECRET;
    let redirectUri = process.env.GITHUB_REDIRECT_URI;

    if (config?.providerConfig) {
        const providers = config.providerConfig as any;
        if (providers.github) {
            clientId = providers.github.clientId || providers.github.client_id || clientId;
            clientSecret = providers.github.clientSecret || providers.github.client_secret || clientSecret;
            redirectUri = providers.github.redirectUri || providers.github.redirect_uri || redirectUri;
        }
    }

    if (!clientId || !clientSecret || !redirectUri) {
        throw new Error(`Missing GitHub Config for tenant ${tenantId}. clientId, clientSecret, and redirectUri are required.`);
    }

    const adapter = getAuthAdapter();
    return new GitHubProvider(adapter, {
        clientId,
        clientSecret,
        redirectUri
    });
}
