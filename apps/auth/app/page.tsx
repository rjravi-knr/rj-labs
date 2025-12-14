
"use client";

import { useAuth } from "@labs/auth/client";
import { Button } from "@labs/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Loader2, Settings, LogOut, Shield } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId") || "acme-corp";

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/sign-in?tenantId=${tenantId}`);
    }
  }, [user, loading, router, tenantId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null; // Redirecting

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-950/50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>
            You are signed in as <span className="font-medium text-foreground">{user.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground text-center">
            <p>Welcome to the <strong>{tenantId}</strong> portal.</p>
            <p className="mt-1">Your role: {user.isSuperAdmin ? "Super Admin" : "User"}</p>
          </div>

          <div className="grid gap-3">
            {user.isSuperAdmin && (
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => router.push(`/settings?tenantId=${tenantId}`)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configure Tenant Auth
              </Button>
            )}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-6 text-xs text-muted-foreground">
        Powered by RJ Suite Auth
      </p>
    </div>
  );
}
