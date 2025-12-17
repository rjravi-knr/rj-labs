"use client";

import { useSettings } from "../settings/context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Label } from "@labs/ui/label";
import { Switch } from "@labs/ui/switch";
import { LoginMethodMatrix } from "../../components/login-method-matrix";

export function AuthConfigView() {
    const { config, updateConfig } = useSettings();
    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Login Combinations</CardTitle>
                    <CardDescription>Configure allowed login methods.</CardDescription>
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
                    
                    <div className="space-y-2">
                        <Label className="text-base">Login Method Configuration</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Enable specific authentication channels.
                        </p>
                        {config.loginMethods && (
                            <LoginMethodMatrix 
                                config={config.loginMethods}
                                onChange={(methods) => updateConfig({ loginMethods: methods })}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
