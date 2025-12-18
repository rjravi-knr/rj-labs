"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Badge } from "@labs/ui/badge";
import { Shield, ShieldAlert, ShieldCheck, Check } from "lucide-react";
import { Button } from "@labs/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@labs/ui/alert-dialog"

export type SecurityPreset = "standard" | "strict" | "custom";

interface SecurityPresetsProps {
    config: any;
    onApply: (preset: any) => void;
}

const PRESETS = {
    standard: {
        passwordPolicy: {
            minLength: 8,
            maxLength: 20,
            requireUppercase: false,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecial: false,
            preventUserData: true
        },
        mfaEnabled: false,
        emailPolicy: {
            allowPublicDomains: true
        }
    },
    strict: {
        passwordPolicy: {
            minLength: 12,
            maxLength: 30,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecial: true,
            preventUserData: true
        },
        mfaEnabled: true,
        emailPolicy: {
            allowPublicDomains: false
        }
    }
};

export function SecurityPresets({ config, onApply }: SecurityPresetsProps) {
    const [activePreset, setActivePreset] = useState<SecurityPreset>("custom");
    const [strictConfirmOpen, setStrictConfirmOpen] = useState(false);

    // Detect active preset based on current config
    useEffect(() => {
        if (isMatch(config, PRESETS.strict)) {
            setActivePreset("strict");
        } else if (isMatch(config, PRESETS.standard)) {
            setActivePreset("standard");
        } else {
            setActivePreset("custom");
        }
    }, [config]);

    const isMatch = (current: any, preset: any) => {
        if (!current) return false;
        
        // Check Password Policy
        const pp = current.passwordPolicy || {};
        const ppp = preset.passwordPolicy;
        if (pp.minLength !== ppp.minLength) return false;
        if (!!pp.requireUppercase !== ppp.requireUppercase) return false;
        if (!!pp.requireNumbers !== ppp.requireNumbers) return false;
        if (!!pp.requireSpecial !== ppp.requireSpecial) return false;

        // Check MFA
        if (!!current.mfaEnabled !== preset.mfaEnabled) return false;

        // Check Email
        const ep = current.emailPolicy || {};
        const pep = preset.emailPolicy;
        if (ep.allowPublicDomains !== pep.allowPublicDomains && pep.allowPublicDomains !== undefined) return false;

        return true;
    };

    const handleApply = (type: "standard" | "strict") => {
        if (type === "strict") {
            setStrictConfirmOpen(true);
        } else {
            applyPreset(type);
        }
    };

    const applyPreset = (type: "standard" | "strict") => {
        onApply(PRESETS[type]);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-lg font-medium">Security Level</h3>
                    <p className="text-sm text-muted-foreground">
                        Choose a security baseline or configure manually.
                    </p>
                </div>
                
                <div className="flex items-center p-1 bg-muted rounded-lg border">
                    <button
                        onClick={() => handleApply("standard")}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            activePreset === "standard" 
                                ? "bg-background text-foreground shadow-sm" 
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                    >
                        <Shield className="h-4 w-4" />
                        Standard
                    </button>
                    <button
                        onClick={() => handleApply("strict")}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            activePreset === "strict" 
                                ? "bg-background text-foreground shadow-sm" 
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                    >
                        <ShieldAlert className="h-4 w-4" />
                        Strict
                    </button>
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            activePreset === "custom" 
                                ? "bg-background text-foreground shadow-sm" 
                                : "text-muted-foreground opacity-50 cursor-default"
                        }`}
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Custom
                    </div>
                </div>
            </div>

            {/* Helper Text based on selection */}
            {activePreset === "standard" && (
                <div className="text-xs text-muted-foreground flex items-center gap-2 bg-blue-50/50 p-2 rounded-md border border-blue-100 dark:border-blue-900/50 dark:bg-blue-900/10">
                    <Check className="h-3 w-3 text-blue-600" />
                    Applies balanced settings: 8 char password, MFA optional, public emails allowed.
                </div>
            )}
            {activePreset === "strict" && (
                <div className="text-xs text-muted-foreground flex items-center gap-2 bg-purple-50/50 p-2 rounded-md border border-purple-100 dark:border-purple-900/50 dark:bg-purple-900/10">
                    <Check className="h-3 w-3 text-purple-600" />
                    Applies high security: 12 char complex password, MFA enforced, no public emails.
                </div>
            )}

            <AlertDialog open={strictConfirmOpen} onOpenChange={setStrictConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apply Strict Security Policy?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will <strong>enforce MFA</strong> for all users and require <strong>12-character complex passwords</strong>. 
                            Users without MFA configured may be forced to set it up on next login.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => {
                                applyPreset("strict");
                                setStrictConfirmOpen(false);
                            }}
                        >
                            Apply Strict Policy
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
