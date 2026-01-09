"use client";

import { useSettings } from "../settings/context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Label } from "@labs/ui/label";
import { Input } from "@labs/ui/input";

export function GeneralSettingsView() {
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
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>Configure external integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="redirectUrl">Callback URL</Label>
                        <p className="text-xs text-muted-foreground">The URL to redirect users to after successful login (e.g. your main application dashboard).</p>
                        <Input 
                            id="redirectUrl" 
                            value={config.redirectUrl || ''}
                            onChange={(e) => updateConfig({ redirectUrl: e.target.value })}
                            placeholder="https://app.yourdomain.com/auth/callback"  
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
