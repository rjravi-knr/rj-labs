"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@labs/auth/client';
import { Loader2 } from 'lucide-react';
import { storage } from '@labs/utils';

export function AuthRedirect() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantId = searchParams.get('tenantId');

    useEffect(() => {
        // Check if user is authenticated via SDK or has token in storage (fast path for redirects)
        const hasToken = storage.get('auth_token');
        
        if ((!loading && user) || hasToken) {
            // Resolve Tenant ID: User > Storage > URL
            // We want to ensure we send them to the correct context, but since the Home page 
            // now handles resolution strictly from storage, we can simply redirect to '/' 
            // IF we are sure storage is set.
            
            // However, to be safe and ensure the context is "sticky" even if storage was somehow empty 
            // (rare strictly if token is there), we can check.
            
            const userInfo = storage.getJSON<any>('user_info');
            const storedTenantId = storage.get('tenantId');
            const resolvedTenant = user?.tenantId || userInfo?.tenantId || storedTenantId || tenantId;

            if (resolvedTenant) {
                 // Storage is the source of truth for the app, ensure it's synced if missing
                 if (!storedTenantId) storage.set('tenantId', resolvedTenant);
                 
                 // User requested clean URL for home page
                 router.push('/');
            } else {
                 // Fallback if absolutely no context found (edge case)
                 router.push('/');
            }
        }
    }, [loading, user, router, tenantId]);

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
