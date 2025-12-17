"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SettingsProvider } from "./context";
import { Sidebar } from "./sidebar";
import { useAuth } from "@labs/auth/client";
import { Header } from "../../components/header";
import { FloatingConfigTrigger } from "./components/floating-config-trigger";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { cn } from "@labs/ui/lib/utils";
import { Loader2 } from "lucide-react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
    const { user, loading, signOut } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in'); // Or specific login route
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <SettingsProvider tenantId={user?.tenantId}>
            <div className="flex h-screen bg-background overflow-hidden">
                {/* Sidebar - Dynamically Sized */}
                <div 
                    className={cn(
                        "border-r border-zinc-800 bg-zinc-950 hidden md:flex flex-col transition-all duration-300 ease-in-out z-20",
                        isCollapsed ? "w-20" : "w-72"
                    )}
                >
                    {/* Brand Header */}
                    <div className="flex h-16 items-center px-6 border-b border-white/10 shrink-0 overflow-hidden">
                        <div className="flex items-center gap-3">
                             <div className="flex h-8 w-8 items-center justify-center shrink-0 rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-glow">
                                R
                            </div>
                            <span className={cn(
                                "font-semibold text-lg tracking-tight text-white whitespace-nowrap transition-opacity duration-300",
                                isCollapsed ? "opacity-0 w-0" : "opacity-100"
                            )}>
                                RJ Studios
                            </span>
                        </div>
                    </div>
                    
                    <Sidebar 
                        userEmail={user?.email} 
                        tenantId={user?.tenantId}
                        onSignOut={signOut}
                        className="flex-1"
                        collapsed={isCollapsed}
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Header */}
                    <Header 
                        userEmail={user?.email} 
                        tenantId={user?.tenantId} 
                        onSignOut={signOut}
                        onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
                    />

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                             <div className="mb-4">
                                <Breadcrumbs />
                             </div>
                            {children}
                        </div>
                    </div>
                </div>
                <FloatingConfigTrigger />
            </div>
        </SettingsProvider>
    );
}
