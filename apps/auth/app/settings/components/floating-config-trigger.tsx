
"use client";

import { useSettings } from "../context";
import { ConfigSummarySheet } from "./config-summary-sheet";
import { Button } from "@labs/ui/button";
import { FileText } from "lucide-react";

export function FloatingConfigTrigger() {
    const { config } = useSettings();

    return (
        <div className="fixed top-24 right-6 z-50 animate-in fade-in slide-in-from-right-10 duration-700">
            <ConfigSummarySheet config={config}>
                <Button 
                    size="icon" 
                    className="h-12 w-12 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-indigo-400/20"
                    title="View Auth Configuration Summary"
                >
                    <FileText className="h-6 w-6" />
                </Button>
            </ConfigSummarySheet>
        </div>
    );
}
