
"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
                const apiBase = process.env.NEXT_PUBLIC_AUTH_API_URL;
                if (!apiBase) throw new Error("NEXT_PUBLIC_AUTH_API_URL is missing");
                const res = await fetch(`${apiBase}/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (res.ok) {
                    const data = await res.json();
                    console.log('Authentication Successful!', data);
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('user_info', JSON.stringify(data.user));
                    // Success! Redirect to home page with tenantId
                    const tenantId = data.user.tenantId ;
                    // Force full reload to ensure AuthProvider picks up the new token from localStorage
                    window.location.href = `/?tenantId=${tenantId}`;
                } else {
                    console.error('Session validation failed', await res.text());
                    router.push('/sign-in?error=invalid_session');
                }
            } catch (err) {
                 console.error('Error verifying session', err);
                 router.push('/sign-in?error=network_error');
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
