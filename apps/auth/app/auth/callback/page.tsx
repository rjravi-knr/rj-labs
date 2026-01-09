"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { storage } from '@labs/utils';
import { api } from '../../../lib/api';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');


    useEffect(() => {
        const verifySession = async () => {
            if (!token) {
                 router.push('/sign-in?error=authentication_failed');
                 return;
            }
            
            try {
                // Verify against the Service API
                // Verify against the Service API
                // We pass the token explicitly because it's not yet in storage
                const data = await api.get<any>('/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                console.log('Authentication Successful!', data);
                
                // Use centralized storage
                storage.set('auth_token', token);
                storage.setJSON('user_info', data.user);
                
                // Success! Redirect to home page with tenantId
                const tenantId = data.user.tenantId;
                // Force full reload to ensure AuthProvider picks up the new token from storage
                window.location.href = `/`;
            } catch (err) {
                 console.error('Session validation failed', err);
                 router.push('/sign-in?error=invalid_session');
            }
        };

        if (token) {
            verifySession();
        }
    }, [token, router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
                <p className="text-muted-foreground">Please wait while we log you in.</p>
            </div>
        </div>
    );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
