"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storage } from "@labs/utils";
import { Loader2 } from "lucide-react";
import { useAuth } from "@labs/auth/client";

export default function LogoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signOut } = useAuth();
    
    // Config - Ideally generic or fetched
    // We reuse the redirectUrl validation flow or Config context if available
    // For now, simple whitelist check matching our setup
    const ALLOWED_ORIGINS = ["http://localhost:3004", "http://localhost:3000"];

    useEffect(() => {
        const performLogout = async () => {
             // Artificial Delay to ensure state clearing propagates and user sees "Signing out"
             // This also helps with race conditions in some browsers
             await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("[AuthLogout] Clearing Auth Session...");
            // 1. Clear SDK State
            await signOut();
            
            // 2. Ensure Storage is wiped (redundant but safe)
            storage.remove("auth_token");
            storage.remove("user_info");
            storage.remove("tenantId");

            // 3. Handle Redirect
            const redirectUrl = searchParams.get("redirect");
            
            if (redirectUrl) {
                // Simple validation to prevent open redirects
                const url = new URL(redirectUrl);
                if (ALLOWED_ORIGINS.includes(url.origin)) {
                     window.location.replace(redirectUrl);
                     return;
                } else {
                    console.warn("[AuthLogout] Invalid redirect origin:", url.origin);
                }
            }

            // Default: Go to Sign In
            router.replace("/sign-in");
        };

        performLogout();
    }, [router, searchParams, signOut]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Signing out...</p>
            </div>
        </div>
    );
}
