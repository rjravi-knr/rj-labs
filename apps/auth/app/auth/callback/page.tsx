
"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            // Persist token
            localStorage.setItem('auth_token', token);
            // Redirect to home or dashboard
            // TODO: Decode token or check state for return URL
            // For now, redirect to sign-in page to refresh state or dashboard
            router.push('/');
        } else {
           // Error or no token
           router.push('/sign-in?error=oauth_failed');
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
