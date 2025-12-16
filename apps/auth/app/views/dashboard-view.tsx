"use client";

import { useSettings } from "../settings/context";
import { Card, CardContent, CardHeader, CardTitle } from "@labs/ui/card";

export function DashboardView() {
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
