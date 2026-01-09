"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@labs/auth/client";
import { Button } from "@labs/ui/button";
import { Input } from "@labs/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@labs/ui/sheet";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@labs/ui/card";
import { 
    Loader2, 
    Shield, 
    LogOut, 
    Bell, 
    Search, 
    UploadCloud,
    Menu
} from "lucide-react";
import { storage } from "@labs/utils";


import { SettingsProvider, useSettings } from "./settings/context";
import { Sidebar, ViewType } from "./settings/sidebar";
import { DashboardView } from "./views/dashboard-view";
import { GeneralSettingsView } from "./views/general-settings-view";
import { AuthConfigView } from "./views/auth-config-view";
import { SocialConnectorsView } from "./views/social-connectors-view";
import { SecuritySetupView } from "./views/security-setup-view";


// 1. Dashboard Content (Consumes Settings)
function DashboardContent({ 
    user, 
    signOut, 
    tenantId, 
    activeView, 
    setActiveView 
}: { 
    user: any; 
    signOut: () => void; 
    tenantId: string | null;
    activeView: ViewType;
    setActiveView: (view: ViewType) => void;
}) {
    // Hooks exist but access might be denied
    const { isLoading, isSaving, hasUnsavedChanges, saveConfig } = useSettings();

    // Show loading if SDK is loading OR if we have a token but no user yet (waiting for SDK)
    const hasToken = storage.get('auth_token');
    // We don't have isAuthLoading here, but user check handles it mostly
    
    // ... (rest of view logic)
    
     if (!user) {
         // Redirect is handled by useEffect above, render null or loading
         return null;
    }

    if (!user.isSuperAdmin) {
        // --- NORMAL USER VIEW ---
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
                </div>

                <div className="grid gap-3">
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

    // --- ADMIN DASHBOARD VIEW ---
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            {/* LEFT: Sidebar (Full Height) */}
            <aside className="hidden w-64 flex-col border-r bg-zinc-950 text-slate-300 lg:flex">
                <div className="flex h-16 items-center px-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-glow">
                            R
                        </div>
                        <span className="font-semibold text-lg tracking-tight text-white">RJ Studios</span>
                    </div>
                </div>
                <Sidebar 
                    activeView={activeView} 
                    onChange={setActiveView} 
                    className="flex-1"
                    onSignOut={signOut}
                    userEmail={user?.email || ""}
                    tenantId={tenantId || ""}
                />
            </aside>

            {/* RIGHT: Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 shadow-sm">
                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden -ml-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0 bg-zinc-950 border-r border-white/10 text-slate-300">
                             <div className="flex h-16 items-center px-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-glow">
                                        R
                                    </div>
                                    <span className="font-semibold text-lg tracking-tight text-white">RJ Studios</span>
                                </div>
                            </div>
                            <Sidebar 
                                activeView={activeView} 
                                onChange={setActiveView} 
                                className="h-[calc(100vh-4rem)]" // Subtract header height
                                onSignOut={signOut}
                                userEmail={user?.email || ""}
                                tenantId={tenantId || ""}
                            />
                        </SheetContent>
                    </Sheet>

                     {/* Search (Centered relative to content area mostly) */}
                    <div className="flex flex-1 items-center justify-between">
                         <div className="relative w-full max-w-md hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search settings..."
                                className="w-full bg-muted/40 pl-9 h-9"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <Button 
                            onClick={saveConfig} 
                            disabled={isSaving || !hasUnsavedChanges} 
                            size="sm"
                            className={hasUnsavedChanges ? "animate-pulse shadow-md" : ""}
                        >
                            {isSaving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <UploadCloud className="mr-2 h-4 w-4" />
                            )}
                            Publish
                            {hasUnsavedChanges && (
                                <span className="ml-2 h-2 w-2 rounded-full bg-white animate-pulse" />
                            )}
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
                        </Button>
                    </div>
                </header>

                {/* Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {isLoading ? (
                         <div className="flex h-40 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto space-y-6 pb-20">
                            {activeView === 'dashboard' && <DashboardView />}
                            {activeView === 'general' && <GeneralSettingsView />}
                            {activeView === 'auth-config' && <AuthConfigView />}
                            {activeView === 'social' && <SocialConnectorsView />}
                            {activeView === 'security' && <SecuritySetupView />}
                            
                            {/* Placeholder for new views */}
                            {['users', 'logs', 'access-control', 'user-model', 'sessions', 'jwt'].includes(activeView) && (
                                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg text-muted-foreground">
                                    <div className="p-4 rounded-full bg-muted mb-4">
                                        <Shield className="h-8 w-8 opacity-50" />
                                    </div>
                                    <h3 className="text-lg font-medium">Coming Soon</h3>
                                    <p className="text-sm">{activeView} configuration is under development.</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

// 2. Dashboard Wrapper (Resolves Tenant & Auth)
function DashboardLayout() {
    const { user, loading: isAuthLoading, signOut } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeView, setActiveView] = useState<ViewType>("dashboard");
    
    // Resolve Tenant ID with strict priority:
    // 1. user_info in storage (Active Session)
    // 2. tenantId in storage (Last Context)
    // 3. URL Param (Fallback)
    
    const getResolvedTenantId = () => {
        const userInfo = storage.getJSON<any>('user_info');
        if (userInfo?.tenantId) return userInfo.tenantId;

        const storedId = storage.get('tenantId');
        if (storedId) return storedId;

        return searchParams.get("tenantId");
    };

    const [tenantId, setTenantId] = useState<string | null>(getResolvedTenantId());

    useEffect(() => {
        const resolved = getResolvedTenantId();
        
        if (resolved && resolved !== tenantId) {
            setTenantId(resolved);
            storage.set('tenantId', resolved);
        }
    }, [searchParams, user]);
    
    // Handle redirect in useEffect to avoid render-time state updates
    useEffect(() => {
        const hasToken = storage.get('auth_token');

        if (!isAuthLoading && !user && !hasToken && tenantId) {
            router.push(`/sign-in?tenantId=${tenantId}`);
        } else if (!isAuthLoading && !user && !hasToken && !tenantId) {
             router.push(`/sign-in`); 
        }
    }, [isAuthLoading, user, router, tenantId]);

    const hasToken = storage.get('auth_token');
    if (isAuthLoading || (hasToken && !user)) {
        return (
             <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!user) {
         return null;
    }

    return (
        <SettingsProvider tenantId={tenantId}>
            <DashboardContent 
                user={user} 
                signOut={signOut} 
                tenantId={tenantId}
                activeView={activeView}
                setActiveView={setActiveView}
            />
        </SettingsProvider>
    );
}

export default function AuthAdminPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <DashboardLayout />
        </Suspense>
    );
}
