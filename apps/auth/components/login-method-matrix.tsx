import * as React from "react";
import { Switch } from "@labs/ui/switch";
import { LoginMethods, LoginMethodEnablement } from "@labs/auth";
import { Smartphone, Mail, User as UserIcon, Lock, Sparkles, KeyRound, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@labs/ui/card";
import { Label } from "@labs/ui/label";
import { Badge } from "@labs/ui/badge";
import { cn } from "@labs/ui/lib/utils";
import Link from "next/link";
import { Button } from "@labs/ui/button";

interface LoginMethodMatrixProps {
  config: LoginMethods;
  onChange: (config: LoginMethods) => void;
}

export function LoginMethodMatrix({ config, onChange }: LoginMethodMatrixProps) {
  const updateMethod = (
    method: "email" | "phone" | "username",
    updates: Partial<LoginMethodEnablement>
  ) => {
    onChange({
      ...config,
      [method]: {
        ...config[method],
        ...updates,
      },
    });
  };

  const MethodCard = ({ 
    title, 
    icon: Icon, 
    methodKey, 
    description,
    colorClass,
    channels
  }: { 
    title: string; 
    icon: any; 
    methodKey: "email" | "phone" | "username";
    description: string;
    colorClass: string;
    channels: { otp: string; magicLink: string };
  }) => {
    const settings = config[methodKey] || {};
    
    // Determine if the Identifier is "Enabled" (if any sub-method is true)
    const isEnabled = Object.values(settings).some(val => val === true);

    const toggleMaster = (checked: boolean) => {
        if (!checked) {
            // Disable all
            updateMethod(methodKey, { password: false, otp: false, magicLink: false, pin: false });
        } else {
            // Enable default (usually password, or OTP for phone)
            if (methodKey === 'phone') {
                 updateMethod(methodKey, { otp: true });
            } else {
                 updateMethod(methodKey, { password: true });
            }
        }
    };

    return (
      <Card className={cn("transition-all duration-200 border-2", isEnabled ? "border-primary/20 shadow-sm" : "border-border/50 opacity-80")}>
        <div className="flex flex-col md:flex-row">
            {/* Header Section (Left or Top) */}
            <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r bg-muted/10 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className={cn("p-3 rounded-xl transition-colors inline-flex", isEnabled ? colorClass : "bg-muted text-muted-foreground")}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <Switch
                            checked={isEnabled}
                            onCheckedChange={toggleMaster}
                            aria-label={`Enable ${title}`}
                            className="scale-110"
                        />
                    </div>
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            {title}
                            {isEnabled && <Badge variant="default" className="text-[10px] h-5 px-2 bg-green-600/90 hover:bg-green-700">Active</Badge>} 
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed">
                            {description}
                        </CardDescription>
                    </div>
                </div>
                
                {/* Smart Prompts / Policy Links */}
                {isEnabled && (
                    <div className="mt-6 space-y-2">
                        {settings.password && (
                            <div className="text-xs bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 p-2 rounded border border-amber-200/50 flex items-start gap-2">
                                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Password Policy</p>
                                    <Link href="/settings/security" className="underline hover:text-amber-900 dark:hover:text-amber-300">
                                        Configure complexity requirements
                                    </Link>
                                </div>
                            </div>
                        )}
                        {settings.otp && (
                            <div className="text-xs bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 p-2 rounded border border-blue-200/50 flex items-start gap-2">
                                <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">OTP Code Settings</p>
                                    <Link href="/settings/security" className="underline hover:text-blue-900 dark:hover:text-blue-300">
                                        Configure expiry & length
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Options Section (Right or Bottom) */}
            <div className="p-6 md:w-2/3">
                {isEnabled ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Password Option */}
                        <div className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-orange-500" />
                                    <Label className="font-semibold cursor-pointer">Password</Label>
                                </div>
                                <p className="text-xs text-muted-foreground w-3/4">
                                    Secure login with a password.
                                </p>
                            </div>
                            <Switch
                                checked={settings.password || false}
                                onCheckedChange={(checked) => updateMethod(methodKey, { password: checked })}
                            />
                        </div>

                        {/* OTP Option */}
                        <div className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    <Label className="font-semibold cursor-pointer">OTP Code</Label>
                                </div>
                                <p className="text-xs text-muted-foreground w-3/4">
                                    Send code via {channels.otp}.
                                </p>
                            </div>
                            <Switch
                                checked={settings.otp || false}
                                onCheckedChange={(checked) => updateMethod(methodKey, { otp: checked })}
                            />
                        </div>

                        {/* Magic Link Option */}
                        <div className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                    <Label className="font-semibold cursor-pointer">Magic Link</Label>
                                </div>
                                <p className="text-xs text-muted-foreground w-3/4">
                                    Send link via {channels.magicLink}.
                                </p>
                            </div>
                            <Switch
                                checked={settings.magicLink || false}
                                onCheckedChange={(checked) => updateMethod(methodKey, { magicLink: checked })}
                            />
                        </div>

                        {/* PIN Option */}
                        <div className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent/40 transition-colors">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <KeyRound className="h-4 w-4 text-emerald-500" />
                                    <Label className="font-semibold cursor-pointer">PIN</Label>
                                </div>
                                <p className="text-xs text-muted-foreground w-3/4">
                                    Simple numeric PIN access.
                                </p>
                            </div>
                            <Switch
                                checked={settings.pin || false}
                                onCheckedChange={(checked) => updateMethod(methodKey, { pin: checked })}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8 space-y-2 opacity-60">
                         <div className="p-3 bg-muted rounded-full">
                            <Icon className="h-6 w-6" />
                         </div>
                         <p className="text-sm">Enable {title} to configure login methods.</p>
                         <Button variant="outline" size="sm" onClick={() => toggleMaster(true)}>Enable {title}</Button>
                    </div>
                )}
            </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="grid gap-8 grid-cols-1 max-w-5xl mx-auto">
      <MethodCard 
        title="Email Identity" 
        icon={Mail} 
        methodKey="email" 
        description="The standard for web applications. Users verify their identity via their email address."
        colorClass="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
        channels={{ otp: "Email", magicLink: "Email" }}
      />
      <MethodCard 
        title="Phone Identity" 
        icon={Smartphone} 
        methodKey="phone" 
        description="Ideal for mobile-first experiences. Users verify identity via SMS or WhatsApp."
        colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
        channels={{ otp: "SMS / WhatsApp", magicLink: "SMS" }}
      />
      <MethodCard 
        title="Username Identity" 
        icon={UserIcon} 
        methodKey="username" 
        description="Flexible identity for community platforms. Users choose a unique handle."
        colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
        channels={{ otp: "Email", magicLink: "Email" }}
      />
    </div>
  );
}
