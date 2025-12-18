"use client";

import { useSettings } from "../app/settings/context";
import { Button } from "@labs/ui/button";
import { Input } from "@labs/ui/input";
import { 
    Search, 
    Bell, 
    Loader2, 
    UploadCloud,
    Menu,
    TriangleAlert,
    PanelLeft,
    Eye
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@labs/ui/sheet";
import { Sidebar } from "../app/settings/sidebar";
import { ChangesReviewDialog } from "../app/settings/components/changes-review-dialog";
import { useState } from "react";

interface HeaderProps {
    userEmail?: string;
    tenantId?: string;
    onSignOut?: () => void;
    onToggleSidebar?: () => void;
}

export function Header({ userEmail, tenantId, onSignOut, onToggleSidebar }: HeaderProps) {
    const { isSaving, hasUnsavedChanges, saveConfig, config, initialConfig } = useSettings();
    const [reviewOpen, setReviewOpen] = useState(false);

    return (
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 shadow-sm shrink-0">
            {/* Desktop Sidebar Toggle */}
            <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex -ml-2 text-muted-foreground hover:text-foreground"
                onClick={onToggleSidebar}
            >
                <PanelLeft className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-zinc-950 border-r border-white/10 text-slate-300">
                        <div className="flex h-16 items-center px-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-glow">
                                R
                            </div>
                            <span className="font-semibold text-lg tracking-tight text-white">RJ Studios</span>
                        </div>
                    </div>
                    <Sidebar 
                        className="h-[calc(100vh-4rem)]" // Subtract header height
                        onSignOut={onSignOut}
                        userEmail={userEmail}
                        tenantId={tenantId}
                    />
                </SheetContent>
            </Sheet>

            {/* Search (Centered relative to content area mostly) */}
            <div className="flex flex-1 items-center justify-center">
                    <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search settings..."
                        className="w-full bg-muted/40 pl-9 h-9"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                {hasUnsavedChanges && (
                    <div className="hidden md:flex items-center gap-2 text-amber-600 dark:text-amber-500 animate-pulse mr-2 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full border border-amber-200/50">
                        <TriangleAlert className="h-4 w-4" />
                        <span className="text-xs font-semibold">Unsaved Changes</span>
                    </div>
                )}
                
                {/* Config Summary removed */}
                
                <Button 
                    onClick={() => setReviewOpen(true)}
                    disabled={isSaving || !hasUnsavedChanges} 
                    size="sm"
                    variant="destructive"
                    className={hasUnsavedChanges ? "shadow-md" : ""}
                >
                    {isSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <UploadCloud className="mr-2 h-4 w-4" />
                    )}
                    Publish
                </Button>

                <ChangesReviewDialog 
                    open={reviewOpen} 
                    onOpenChange={setReviewOpen}
                    initialConfig={initialConfig}
                    currentConfig={config}
                    onConfirm={async () => {
                        await saveConfig();
                        setReviewOpen(false);
                    }}
                    isSaving={isSaving}
                />

                <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden md:flex gap-2"
                    onClick={() => window.open('/preview', '_blank')}
                >
                    <Eye className="h-4 w-4" />
                    Preview
                </Button>
                
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
                </Button>
            </div>
        </header>
    );
}
