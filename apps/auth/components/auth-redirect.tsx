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
            // User is already authenticated (or has token), redirect to home
            router.push(`/?tenantId=${tenantId}`);
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
