
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@labs/auth/client";
import { Button } from "@labs/ui/button";
import { Input } from "@labs/ui/input";
import { Label } from "@labs/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";

import { Switch } from "@labs/ui/switch";
import { toast } from "@labs/ui/sonner";
import { Loader2, ArrowLeft, Save, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
    const { user, session, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantId = searchParams.get("tenantId") || "acme-corp";

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Config State
    const [appName, setAppName] = useState("");
    const [selfRegistration, setSelfRegistration] = useState(true);
    const [termsUrl, setTermsUrl] = useState("");
    const [privacyUrl, setPrivacyUrl] = useState("");

    useEffect(() => {
        if (isAuthLoading) return;

        if (!user || !session) {
            router.push(`/sign-in?tenantId=${tenantId}`);
            return;
        }

        if (!user.isSuperAdmin) {
            return; // Will render Access Denied UI
        }

        // Fetch current config
        const fetchConfig = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/config?tenantId=${tenantId}`);
                if (!res.ok) throw new Error("Failed to load config");
                const data = await res.json();
                
                setAppName(data.name || "");
                setSelfRegistration(data.selfRegistrationEnabled ?? true);
                setTermsUrl(data.termsUrl || "");
                setPrivacyUrl(data.privacyUrl || "");
            } catch (error) {
                toast.error("Could not load settings.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, [isAuthLoading, user, session, tenantId, router]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/config?tenantId=${tenantId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.token}`
                },
                body: JSON.stringify({
                    name: appName,
                    selfRegistrationEnabled: selfRegistration,
                    termsUrl,
                    privacyUrl
                })
            });

            if (!res.ok) {
                 const err = await res.json();
                 throw new Error(err.error || "Update failed");
            }

            toast.success("Settings updated successfully!");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };


    if (isAuthLoading || (user?.isSuperAdmin && isLoading)) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user?.isSuperAdmin) {
        return (
             <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center space-y-4">
                <ShieldAlert className="h-16 w-16 text-destructive opacity-50" />
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground max-w-md">
                    You do not have permission to access admin settings.
                    Please contact a Super Admin.
                </p>
                <Button onClick={() => router.push(`/sign-in?tenantId=${tenantId}`)} variant="outline">
                    Back to Sign In
                </Button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950/50 p-6 md:p-10">
            <div className="mx-auto w-full max-w-3xl space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">Tenant Settings</h2>
                        <p className="text-muted-foreground">
                            Configure appearance and policies for <strong>{tenantId}</strong>
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>

                <div className="grid gap-6">
                    {/* General Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>General</CardTitle>
                            <CardDescription>Basic information about your tenant application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="appName">Application Name</Label>
                                <Input 
                                    id="appName" 
                                    placeholder="e.g. Acme Corp Portal" 
                                    value={appName}
                                    onChange={(e) => setAppName(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                     {/* Policies */}
                     <Card>
                        <CardHeader>
                            <CardTitle>Policies & Registration</CardTitle>
                            <CardDescription>Control how users access your application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Self-Registration</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow users to create their own accounts via the Sign Up page.
                                    </p>
                                </div>
                                <Switch 
                                    checked={selfRegistration}
                                    onCheckedChange={setSelfRegistration}
                                />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="termsUrl">Terms of Service URL</Label>
                                <Input 
                                    id="termsUrl" 
                                    placeholder="https://..." 
                                    value={termsUrl}
                                    onChange={(e) => setTermsUrl(e.target.value)}
                                />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="privacyUrl">Privacy Policy URL</Label>
                                <Input 
                                    id="privacyUrl" 
                                    placeholder="https://..." 
                                    value={privacyUrl}
                                    onChange={(e) => setPrivacyUrl(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsLoading(true)}>Discard</Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
