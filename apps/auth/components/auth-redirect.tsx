"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@labs/auth/client';
import { Loader2 } from 'lucide-react';
import { storage } from '@labs/utils';

interface AuthRedirectProps {
    redirectParam?: string;
    allowedBase?: string;
}

export function AuthRedirect({ redirectParam, allowedBase }: AuthRedirectProps) {
    const { user, loading, session } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantId = searchParams.get('tenantId');

    useEffect(() => {
        // Check if user is authenticated via SDK or has token in storage (fast path for redirects)
        const hasToken = storage.get('auth_token');
        
        if ((!loading && user) || hasToken) {
            // Resolve Tenant ID logic (keep existing context logic)
            const userInfo = storage.getJSON<any>('user_info');
            const storedTenantId = storage.get('tenantId');
            const resolvedTenant = user?.tenantId || userInfo?.tenantId || storedTenantId || tenantId;

            if (resolvedTenant && !storedTenantId) {
                 storage.set('tenantId', resolvedTenant);
            }

            // REDIRECT LOGIC
            // 1. Check for valid SSO Redirect Param
            if (redirectParam) {
                const normalize = (url: string) => url.endsWith('/') ? url.slice(0, -1) : url;
                const normalizedBase = allowedBase ? normalize(allowedBase) : null;
                const normalizedTarget = normalize(redirectParam);

                console.log('[AuthRedirect] Validating:', { 
                    param: redirectParam, 
                    base: allowedBase,
                    normParam: normalizedTarget, 
                    normBase: normalizedBase 
                });

                 if (normalizedBase && normalizedTarget.startsWith(normalizedBase)) {
                     // VALID: Attach token and go
                     const token = session?.token || hasToken;
                     if (token) {
                         const separator = redirectParam.includes('?') ? '&' : '?';
                         window.location.replace(`${redirectParam}${separator}token=${token}`);
                         return;
                     }
                } else if (allowedBase) {
                     // INVALID: Block
                     console.warn(`[AuthRedirect] Blocked invalid redirect to: ${redirectParam}`);
                     // Do not redirect to target. Fall through to dashboard.
                }
            }

            // 2. Default: Dashboard
            router.replace('/');
        }
    }, [loading, user, router, tenantId, redirectParam, allowedBase, session]);

    // Show loading while checking auth or redirecting
    if (loading || user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // User is not authenticated, allow sign-in page to render
    return null;
}
