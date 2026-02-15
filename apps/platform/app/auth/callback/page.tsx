"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storage } from "@labs/utils";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        
        if (token) {
            console.log("[Platform] Received Token via Callback:", token);
            // Save token using shared storage utility (or direct localStorage if cross-domain storage wasn't shared)
            // Since we are different domains (ports), we must rely on the passed token.
            storage.set("auth_token", token);
            
            // Redirect to home/dashboard
            router.replace("/");
        } else {
            console.warn("[Platform] No token found in callback");
            router.replace("/");
        }
    }, [searchParams, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Authenticating...</p>
            </div>
        </div>
    );
}
