"use client";

import { useState } from "react";
import { useSettings } from "../settings/context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Label } from "@labs/ui/label";
import { Slider } from "@labs/ui/slider";
import { Switch } from "@labs/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@labs/ui/tabs";
import { Input } from "@labs/ui/input";
import { Button } from "@labs/ui/button";
import { PolicyConfigCard } from "../../components/policy-config-card";
import { PasswordStrengthMeter } from "../../components/password-strength-meter";
import { generateExamplePasswords, validatePassword } from "@labs/auth/password-policy";

export function SecuritySetupView() {
    const { config, updateConfig } = useSettings();
    const [testPassword, setTestPassword] = useState("");
    const suggestions = generateExamplePasswords(config.passwordPolicy as any);

    return (
        <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-12">
                <Tabs defaultValue="password" className="w-full">
                    {/* ... Content ... */}
                <TabsList className="grid w-full grid-cols-5 mb-6">
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="mfa">MFA</TabsTrigger>
                        <TabsTrigger value="otp">OTP</TabsTrigger>
                        <TabsTrigger value="pin">PIN</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="password" className="mt-0">
                        {/* ... Existing Password Content ... */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Password Policy</CardTitle>
                                <CardDescription>Set requirements for user passwords.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4">
                                     <div className="flex items-center justify-between">
                                        <Label htmlFor="length-slider">Password Length</Label>
                                        <span className="text-sm font-medium font-mono bg-muted px-2 py-0.5 rounded">
                                            {config.passwordPolicy.minLength} - {config.passwordPolicy.maxLength || 20} chars
                                        </span>
                                     </div>
                                     <Slider 
                                        id="length-slider"
                                        value={[
                                            config.passwordPolicy.minLength, 
                                            Math.min(20, config.passwordPolicy.maxLength || 20)
                                        ]}
                                        onValueChange={([min, max]) => updateConfig({ 
                                            passwordPolicy: { ...config.passwordPolicy, minLength: min ?? 5, maxLength: max ?? 20 } 
                                        })}
                                        min={1}
                                        max={20}
                                        step={1}
                                        className="py-4"
                                     />
                                     <p className="text-xs text-muted-foreground">
                                        Define the minimum and maximum character count allowed (1-20).
                                     </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Complexity Requirements</h4>
                                    
                                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <Label>Require Uppercase</Label>
                                            <p className="text-xs text-muted-foreground">Must contain at least one uppercase letter (A-Z)</p>
                                        </div>
                                        <Switch 
                                            checked={config.passwordPolicy.requireUppercase ?? false}
                                            onCheckedChange={(c) => updateConfig({ 
                                                passwordPolicy: { ...config.passwordPolicy, requireUppercase: c } 
                                            })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <Label>Require Lowercase</Label>
                                            <p className="text-xs text-muted-foreground">Must contain at least one lowercase letter (a-z)</p>
                                        </div>
                                        <Switch 
                                            checked={config.passwordPolicy.requireLowercase ?? false}
                                            onCheckedChange={(c) => updateConfig({ 
                                                passwordPolicy: { ...config.passwordPolicy, requireLowercase: c } 
                                            })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <Label>Require Numbers</Label>
                                            <p className="text-xs text-muted-foreground">Must contain at least one number (0-9)</p>
                                        </div>
                                        <Switch 
                                            checked={config.passwordPolicy.requireNumbers ?? false}
                                            onCheckedChange={(c) => updateConfig({ 
                                                passwordPolicy: { ...config.passwordPolicy, requireNumbers: c } 
                                            })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <Label>Require Special Characters</Label>
                                            <p className="text-xs text-muted-foreground">Must contain at least one special character (!@#...)</p>
                                        </div>
                                        <Switch 
                                            checked={config.passwordPolicy.requireSpecial ?? false}
                                            onCheckedChange={(c) => updateConfig({ 
                                                passwordPolicy: { ...config.passwordPolicy, requireSpecial: c } 
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Advanced Security</h4>
                                     <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <Label>Prevent User Data</Label>
                                            <p className="text-xs text-muted-foreground">Passwords cannot contain the user&apos;s email or name</p>
                                        </div>
                                        <Switch 
                                            checked={config.passwordPolicy.preventUserData ?? false}
                                            onCheckedChange={(c) => updateConfig({ 
                                                passwordPolicy: { ...config.passwordPolicy, preventUserData: c } 
                                            })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="email" className="mt-0">
                        <Card>
                             <CardHeader>
                                <CardTitle>Email Security Policy</CardTitle>
                                <CardDescription>Control which email domains are allowed to sign up.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Allow Public Domains</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Allow personal emails like Gmail, Yahoo, Outlook, etc.
                                        </p>
                                    </div>
                                    <Switch 
                                        checked={config.emailPolicy?.allowPublicDomains ?? true}
                                        onCheckedChange={(checked) => updateConfig({ 
                                            emailPolicy: { ...config.emailPolicy, allowPublicDomains: checked } 
                                        })}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                     <Label>Allowed Domains (Whitelist)</Label>
                                     <Input 
                                        placeholder="acme.com, partners.org"
                                        value={config.emailPolicy?.allowedDomains?.join(", ") || ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const domains = val.split(",").map(d => d.trim()).filter(Boolean);
                                            updateConfig({ 
                                                emailPolicy: { ...config.emailPolicy, allowedDomains: domains } 
                                            });
                                        }}
                                     />
                                     <p className="text-xs text-muted-foreground">
                                        Only allow users from these specific domains. Leave empty to allow all (unless public domains are blocked).
                                     </p>
                                </div>

                                <div className="space-y-2">
                                     <Label>Blocked Domains (Blacklist)</Label>
                                     <Input 
                                        placeholder="competitor.com, spam.net"
                                        value={config.emailPolicy?.blockedDomains?.join(", ") || ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const domains = val.split(",").map(d => d.trim()).filter(Boolean);
                                            updateConfig({ 
                                                emailPolicy: { ...config.emailPolicy, blockedDomains: domains } 
                                            });
                                        }}
                                     />
                                     <p className="text-xs text-muted-foreground">
                                        Explicitly block users from these domains.
                                     </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="mfa" className="mt-0">
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
                    </TabsContent>

                    <TabsContent value="otp" className="mt-0">
                        <PolicyConfigCard 
                            title="OTP Policy"
                            description="Settings for One-Time Passwords (Email/SMS)."
                            policy={config.otpPolicy || { length: 6, expiry: 300, maxAttempts: 3 }}
                            onSave={(policy) => updateConfig({ otpPolicy: policy })}
                        />
                    </TabsContent>

                    <TabsContent value="pin" className="mt-0">
                        <PolicyConfigCard 
                            title="PIN Policy"
                            description="Settings for backup PINs."
                            policy={config.pinPolicy || { length: 4, expiry: 0, maxAttempts: 5 }}
                            onSave={(policy) => updateConfig({ pinPolicy: policy })}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            
            {/* 
            <div className="space-y-6 lg:col-span-4">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Policy Playground</CardTitle>
                        <CardDescription>Test your password rules in real-time.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Test Input</Label>
                            <Input 
                                value={testPassword}
                                onChange={(e) => setTestPassword(e.target.value)}
                                placeholder="Type a password..."
                            />
                             <PasswordStrengthMeter 
                                password={testPassword} 
                                policy={config.passwordPolicy as any} 
                             />
                        </div>
                        
                        <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                            <h4 className="text-sm font-medium flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                Admin Suggestions
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Based on your current settings, these passwords check out:
                            </p>
                            <div className="space-y-2 pt-1">
                                {suggestions.map((example, i) => {
                                    // Calculate simple strength score for badge
                                    const result = validatePassword(example, config.passwordPolicy as any);
                                    let score = 0;
                                    if (result.isValid) score += 2;
                                    // Bonus for length
                                    if (example.length >= (config.passwordPolicy.minLength || 8) + 2) score += 1;
                                    // Bonus for special chars
                                    if (/[!@#$%^&*]/.test(example)) score += 1;
                                    
                                    let strengthLabel = "Good";
                                    let strengthColor = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
                                    
                                    if (score >= 4) {
                                        strengthLabel = "Strong";
                                        strengthColor = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
                                    } else if (score <= 2) { // Changed from < 2 to <= 2 to capture minimal valid passwords
                                         strengthLabel = "Weak";
                                         strengthColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                                    }

                                    return (
                                        <div key={i} className="flex items-center justify-between text-xs bg-background p-2 rounded border">
                                           <div className="flex items-center gap-2">
                                                <code className="font-mono">{example}</code>
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${strengthColor}`}>
                                                    {strengthLabel}
                                                </span>
                                           </div>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-6 px-2"
                                                onClick={() => setTestPassword(example)}
                                            >
                                                Try
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div> 
            */}
        </div>
    );
}
