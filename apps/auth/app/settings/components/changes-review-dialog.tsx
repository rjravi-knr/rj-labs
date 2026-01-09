"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@labs/ui/dialog";
import { Button } from "@labs/ui/button";
import { AuthConfig } from "../context";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@labs/ui/lib/utils";

interface ChangesReviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialConfig: AuthConfig;
    currentConfig: AuthConfig;
    onConfirm: () => void;
    isSaving: boolean;
}

export function ChangesReviewDialog({ 
    open, 
    onOpenChange, 
    initialConfig, 
    currentConfig, 
    onConfirm,
    isSaving
}: ChangesReviewDialogProps) {

    // Helper to calculate diffs
    const calculateDiffs = () => {
        const diffs: { category: string; key: string; oldVal: string; newVal: string }[] = [];

        // Check Top Level Primitives
        const keys: (keyof AuthConfig)[] = ['name', 'selfRegistrationEnabled', 'mfaEnabled', 'termsUrl', 'privacyUrl', 'redirectUrl'];
        keys.forEach(key => {
            if (initialConfig[key] !== currentConfig[key]) {
                 // Format value for display
                 const format = (v: any) => typeof v === 'boolean' ? (v ? 'Enabled' : 'Disabled') : (v || 'Empty');
                 diffs.push({
                     category: 'General',
                     key: key,
                     oldVal: format(initialConfig[key]),
                     newVal: format(currentConfig[key])
                 });
            }
        });

        // Check Password Policy
        const ppKeys = Object.keys({ ...initialConfig.passwordPolicy, ...currentConfig.passwordPolicy });
        ppKeys.forEach(k => {
             const key = k as keyof typeof initialConfig.passwordPolicy;
             // Use double-equals or manual undefined check to treat undefined as false/null if needed, but strict is comparison is better
             const oldV = initialConfig.passwordPolicy[key];
             const newV = currentConfig.passwordPolicy[key];
             
             if (oldV !== newV) {
                // Ignore matching undefined/false if simple check
                if (!oldV && !newV) return;

                const format = (v: any) => typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v ?? 'Default');
                diffs.push({
                    category: 'Password Policy',
                    key: key,
                    oldVal: format(oldV),
                    newVal: format(newV)
                });
             }
        });

        // Check Email Policy
        const epKeys = ['allowPublicDomains'];
        epKeys.forEach(k => {
             const key = k as 'allowPublicDomains';
             const oldV = initialConfig.emailPolicy?.[key];
             const newV = currentConfig.emailPolicy?.[key];
             if (oldV !== newV) {
                diffs.push({
                    category: 'Email Policy',
                    key: key,
                    oldVal: oldV ? 'Allowed' : 'Blocked',
                    newVal: newV ? 'Allowed' : 'Blocked'
                });
             }
        });
        
        // Deep compare array fields for email policy domains if needed, skipping for MVP brevity unless requested

        return diffs;
    };

    const diffs = calculateDiffs();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Review Changes</DialogTitle>
                    <DialogDescription>
                        Please review your changes before publishing. This will affect all users immediately.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[60vh] overflow-y-auto py-4 pr-4">
                    {diffs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                            <CheckCircle2 className="h-10 w-10 mb-2 opacity-50" />
                            <p>No changes detected.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Group by category if we had complex grouping, otherwise flat list */}
                            <div className="border rounded-lg divide-y">
                                <div className="grid grid-cols-12 bg-muted/50 p-3 text-xs font-medium text-muted-foreground">
                                    <div className="col-span-4">Setting</div>
                                    <div className="col-span-4 pl-4">Old Value</div>
                                    <div className="col-span-4 pl-4">New Value</div>
                                </div>
                                {diffs.map((diff, i) => (
                                    <div key={i} className="grid grid-cols-12 p-3 text-sm items-center">
                                        <div className="col-span-4">
                                            <span className="font-medium text-foreground">{diff.key}</span>
                                            <div className="text-xs text-muted-foreground">{diff.category}</div>
                                        </div>
                                        <div className="col-span-4 pl-4 text-muted-foreground line-through opacity-70 break-all">
                                            {diff.oldVal}
                                        </div>
                                        <div className="col-span-4 pl-4 flex items-center gap-2 font-medium text-blue-600 break-all">
                                            <ArrowRight className="h-3 w-3 shrink-0" /> {diff.newVal}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button 
                        onClick={onConfirm} 
                        disabled={diffs.length === 0 || isSaving}
                    >
                        {isSaving ? "Publishing..." : "Publish Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
