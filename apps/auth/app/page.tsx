"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@labs/auth/client";
import { Button } from "@labs/ui/button";
import { Input } from "@labs/ui/input";
import { Label } from "@labs/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Switch } from "@labs/ui/switch";
import { Loader2, Shield, Save, Copy, LogOut } from "lucide-react";
import { toast } from "@labs/ui/sonner";

import { SettingsProvider, useSettings } from "./settings/context";
import { Sidebar, ViewType } from "./settings/sidebar";

// --- VIEWS ---

function DashboardView() {
    const { config } = useSettings();
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground">
                    Welcome to the Auth Admin for <strong>{config.name || "your application"}</strong>.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Self Registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{config.selfRegistrationEnabled ? "Active" : "Disabled"}</div>
                        <p className="text-xs text-muted-foreground">User sign-up status</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MFA Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{config.mfaEnabled ? "Enforced" : "Optional"}</div>
                        <p className="text-xs text-muted-foreground">Multi-factor authentication</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Object.keys(config.providerConfig).length + 1}</div>
                        <p className="text-xs text-muted-foreground">Email + Social Connectors</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function GeneralSettingsView() {
    const { config, updateConfig } = useSettings();
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Branding & Identity</CardTitle>
                    <CardDescription>Configure how your application appears to users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="appName">Application Name</Label>
                        <Input 
                            id="appName" 
                            value={config.name}
                            onChange={(e) => updateConfig({ name: e.target.value })}
                            placeholder="e.g. Acme Corp Portal" 
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Legal & Compliance</CardTitle>
                    <CardDescription>Links to your terms and privacy policy.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="termsUrl">Terms of Service URL</Label>
                        <Input 
                            id="termsUrl" 
                            value={config.termsUrl}
                            onChange={(e) => updateConfig({ termsUrl: e.target.value })}
                            placeholder="https://..." 
                        />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="privacyUrl">Privacy Policy URL</Label>
                        <Input 
                            id="privacyUrl" 
                            value={config.privacyUrl}
                            onChange={(e) => updateConfig({ privacyUrl: e.target.value })}
                            placeholder="https://..." 
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function AuthConfigView() {
    const { config, updateConfig } = useSettings();
    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Login Combinations</CardTitle>
                    <CardDescription>Configure allowed login methods (Coming Soon).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between rounded-lg border p-4 opacity-75">
                        <div className="space-y-0.5">
                            <Label className="text-base">Self-Registration</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow users to create their own accounts via the Sign Up page.
                            </p>
                        </div>
                        <Switch 
                            checked={config.selfRegistrationEnabled}
                            onCheckedChange={(checked) => updateConfig({ selfRegistrationEnabled: checked })}
                        />
                    </div>
                    <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                        Advanced Login Combinations (Email+OTP, Phone+PIN, etc.) are under development.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SocialConnectorsView() {
    const { config, updateProviderConfig } = useSettings();
    const [enabledProviders, setEnabledProviders] = useState<Record<string, boolean>>({
        google: !!config.providerConfig.google?.clientId,
        microsoft: !!config.providerConfig.microsoft?.clientId,
        github: !!config.providerConfig.github?.clientId,
        linkedin: !!config.providerConfig.linkedin?.clientId,
    });

    const getRedirectUri = (provider: string) => {
        if (typeof window === 'undefined') return '';
        return `${window.location.origin}/api/auth/callback/${provider}`;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const toggleProvider = (provider: string, checked: boolean) => {
        setEnabledProviders(prev => ({ ...prev, [provider]: checked }));
        if (!checked) {
             // Optional: Clear config if disabled? Or keep it? keeping it for now.
        }
    };

    const PROVIDERS = [
        {
            id: 'google',
            name: 'Google Workspace',
            description: 'Allow users to sign in with their Google / Gmail accounts.',
            docs: 'https://developers.google.com/identity/protocols/oauth2',
            icon: (props: any) => (
               <svg viewBox="0 0 24 24" {...props}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            )
        },
        {
            id: 'microsoft',
            name: 'Microsoft Entra ID',
            description: 'Enable login for Office 365 and Microsoft accounts.',
            docs: 'https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app',
            hasTenantId: true,
            icon: (props: any) => (
                 <svg viewBox="0 0 23 23" {...props}><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
            )
        },
        {
            id: 'github',
            name: 'GitHub',
            description: 'Essential for developer-focused applications.',
            docs: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app',
            icon: (props: any) => (
                <svg viewBox="0 0 98 96" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>
            )
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            description: 'Professional identity verification.',
            docs: 'https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow',
             icon: (props: any) => (
                <svg viewBox="0 0 24 24"  {...props}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0077B5"/></svg>
             )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Social Connectors</h3>
                    <p className="text-sm text-muted-foreground">
                        Enable third-party identity providers for your tenants.
                    </p>
                </div>
            </div>

            {PROVIDERS.map((provider) => {
                const isEnabled = enabledProviders[provider.id];
                 // @ts-ignore
                const providerData = config.providerConfig[provider.id] || {};
                const redirectUri = getRedirectUri(provider.id);

                return (
                    <Card key={provider.id} className={!isEnabled ? "opacity-75" : ""}>
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2">
                                        <provider.icon className="w-full h-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            {provider.name}
                                        </CardTitle>
                                        <CardDescription className="text-xs max-w-sm">
                                            {provider.description}
                                        </CardDescription>
                                    </div>
                                </div>
                                <Switch 
                                    checked={isEnabled}
                                    onCheckedChange={(checked) => toggleProvider(provider.id, checked)}
                                />
                            </div>
                        </CardHeader>
                        {isEnabled && (
                            <CardContent className="pt-0 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor={`${provider.id}-client-id`}>Client ID / App ID</Label>
                                        <Input 
                                            id={`${provider.id}-client-id`}
                                            value={providerData.clientId || ""}
                                            onChange={(e) => updateProviderConfig(provider.id as any, { clientId: e.target.value })}
                                            placeholder="Paste Client ID here"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`${provider.id}-client-secret`}>Client Secret</Label>
                                        <Input 
                                            id={`${provider.id}-client-secret`}
                                            type="password"
                                            value={providerData.clientSecret || ""}
                                            onChange={(e) => updateProviderConfig(provider.id as any, { clientSecret: e.target.value })}
                                            placeholder="Paste Client Secret here"
                                        />
                                    </div>
                                    {provider.hasTenantId && (
                                         <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor={`${provider.id}-tenant-id`}>Tenant ID (Directory ID)</Label>
                                            <Input 
                                                id={`${provider.id}-tenant-id`}
                                                value={providerData.tenantId || ""}
                                                onChange={(e) => updateProviderConfig(provider.id as any, { tenantId: e.target.value })}
                                                placeholder="e.g. 52c145..."
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-md bg-muted/50 p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                         <Label className="text-xs font-medium uppercase text-muted-foreground">Callback URL</Label>
                                         <a 
                                            href={provider.docs} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline flex items-center gap-1"
                                         >
                                            How to set up? 
                                            <Copy className="h-3 w-3" />
                                         </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 rounded bg-background px-2 py-1 font-mono text-xs border">
                                           {redirectUri}
                                        </code>
                                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(redirectUri)}>
                                            <Copy className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}

function SecuritySetupView() {
    const { config, updateConfig } = useSettings();
    return (
        <div className="space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle>Password Policy</CardTitle>
                    <CardDescription>Set requirements for user passwords.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="minLength">Minimum Length</Label>
                        <Input 
                            id="minLength" 
                            type="number"
                            min={6}
                            max={32}
                            value={config.passwordPolicy.minLength}
                            onChange={(e) => updateConfig({ 
                                passwordPolicy: { ...config.passwordPolicy, minLength: parseInt(e.target.value) || 8 } 
                            })}
                        />
                    </div>
                </CardContent>
            </Card>

             <Card>
                 <CardHeader>
                    <CardTitle>Multi-Factor Authentication (MFA)</CardTitle>
                    <CardDescription>Enhance security with second-factor verification.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Enforce MFA</Label>
                            <p className="text-sm text-muted-foreground">
                                Require all users to set up 2FA.
                            </p>
                        </div>
                        <Switch 
                            checked={config.mfaEnabled}
                            onCheckedChange={(checked) => updateConfig({ mfaEnabled: checked })}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// --- LAYOUT & MAIN PAGE ---

function DashboardLayout() {
    const { user, loading: isAuthLoading, signOut } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantId = searchParams.get("tenantId") || "acme-corp";
    
    // Hooks exist but access might be denied
    const { isLoading, isSaving, hasUnsavedChanges, saveConfig } = useSettings();
    const [activeView, setActiveView] = useState<ViewType>("dashboard");

    if (isAuthLoading) {
        return (
             <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!user) {
         // Redirecting... (handled by useEffect usually, but for safe rendering)
         router.push(`/sign-in?tenantId=${tenantId}`);
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
        <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950/50">
             {/* Header */}
             <div className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6 shadow-sm">
                <div className="flex flex-1 items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight">Auth Admin</h2>
                        <p className="text-xs text-muted-foreground font-mono">{tenantId}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {hasUnsavedChanges && (
                            <p className="text-xs text-amber-600 font-medium">Unsaved Changes</p>
                        )}
                        <Button onClick={saveConfig} disabled={isSaving || !hasUnsavedChanges} size="sm">
                            {isSaving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Save Changes
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => signOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 items-start">
                <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-60 border-r bg-background lg:block pt-6 pl-6">
                    <Sidebar activeView={activeView} onChange={setActiveView} />
                </aside>
                
                <main className="flex-1 p-6 lg:pl-64 pt-6">
                    {isLoading ? (
                         <div className="flex h-40 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="max-w-4xl space-y-6">
                            {activeView === 'dashboard' && <DashboardView />}
                            {activeView === 'general' && <GeneralSettingsView />}
                            {activeView === 'auth-config' && <AuthConfigView />}
                            {activeView === 'social' && <SocialConnectorsView />}
                            {activeView === 'security' && <SecuritySetupView />}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <SettingsProvider>
            <DashboardLayout />
        </SettingsProvider>
    );
}
