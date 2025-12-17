
"use client"

import { AuthConfig } from "@labs/auth/types";
import { generateConfigSummary } from "../../../lib/config-summary";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@labs/ui/sheet";
import { Button } from "@labs/ui/button";
// import { ScrollArea } from "@labs/ui/scroll-area";
import { BookOpen, CheckCircle, AlertTriangle, Info, ShieldAlert } from "lucide-react";

interface ConfigSummarySheetProps {
    config: AuthConfig;
    children?: React.ReactNode; // Custom Trigger
}

export function ConfigSummarySheet({ config, children }: ConfigSummarySheetProps) {
    const sections = generateConfigSummary(config);

    const getIcon = (name: string) => {
        return null;
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children || (
                    <Button variant="outline" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Review Configuration
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Authentication Configuration</SheetTitle>
                    <SheetDescription>
                        A plain English summary of your currently active security policies.
                    </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 h-[calc(100vh-150px)] overflow-y-auto pr-4">
                    <div className="flex flex-col gap-6">
                        {sections.map((section, idx) => (
                            <div key={idx} className="rounded-lg border p-4 shadow-sm bg-card">
                                <h3 className="mb-3 font-semibold text-foreground border-b pb-2">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.rules.map((rule, rIdx) => (
                                        <li key={rIdx} className="flex items-start gap-3 text-sm">
                                            <span className="mt-0.5 text-lg leading-none" role="img" aria-label="icon">
                                                {/* Use Emoji passed from helper directly if valid, or map lucide */}
                                                {(rule.icon.length < 3) ? rule.icon : (
                                                    // Fallback for string names if i switch logic
                                                    rule.status === 'good' ? <CheckCircle className="h-4 w-4 text-green-500"/> :
                                                    rule.status === 'warning' ? <AlertTriangle className="h-4 w-4 text-orange-500"/> :
                                                    rule.status === 'critical' ? <ShieldAlert className="h-4 w-4 text-red-500"/> :
                                                    <Info className="h-4 w-4 text-blue-500"/>
                                                )}
                                            </span>
                                            <span className={
                                                rule.status === 'critical' ? 'text-destructive font-medium' : 
                                                'text-muted-foreground'
                                            }>
                                                {rule.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
