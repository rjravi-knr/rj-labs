"use client";

import { cn } from "@labs/ui/lib/utils";
import { Button } from "@labs/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Settings, 
    ShieldCheck, 
    KeyRound, 
    Plug,
    Users,
    Activity,
    Lock,
    Sparkles,
    FileText,
    LogOut,
    User
} from "lucide-react";

export type ViewType = 
    | "dashboard" 
    | "users"
    | "logs"
    | "general" 
    | "auth-config" 
    | "social" 
    | "security"
    | "branding"
    | "access-control"
    | "user-model"
    | "sessions"
    | "jwt";

interface SidebarProps {
    className?: string;
    onSignOut?: () => void;
    userEmail?: string;
    tenantId?: string;
    collapsed?: boolean;
}

type MenuItem = {
    id: ViewType | "docs";
    label: string;
    icon: any;
    external?: boolean;
    href: string;
};

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

const MENU_GROUPS: MenuGroup[] = [
    {
        title: "Manage",
        items: [
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
            { id: "users", label: "Users", icon: Users, href: "/settings/users" },
            { id: "logs", label: "Logs", icon: Activity, href: "/settings/logs" },
        ]
    },
    {
        title: "Configure",
        items: [
            { id: "general", label: "Branding", icon: Sparkles, href: "/settings/general" },
            { id: "auth-config", label: "Access Control", icon: Lock, href: "/settings/auth" },
            { id: "social", label: "SSO & Social", icon: Plug, href: "/settings/social" },
            { id: "user-model", label: "User Model", icon: User, href: "/settings/user-model" },
            { id: "security", label: "Security Policy", icon: ShieldCheck, href: "/settings/security" },
            { id: "sessions", label: "Sessions", icon: KeyRound, href: "/settings/sessions" },
            { id: "jwt", label: "JWT Config", icon: Settings, href: "/settings/jwt" },
        ]
    },
    {
        title: "Developer",
        items: [
            { 
                id: "docs", 
                label: "Documentation", 
                icon: FileText, 
                external: true, 
                href: process.env.NEXT_PUBLIC_AUTH_DOCS_URL || '/'
            },
        ]
    }
];

export function Sidebar({ className, onSignOut, userEmail, tenantId, collapsed = false, activeView, onChange }: SidebarProps & { activeView?: ViewType; onChange?: (view: ViewType) => void }) {
    const pathname = usePathname();

    const isActive = (href: string, id: string) => {
        if (activeView) return activeView === id;
        if (href === '/dashboard' && pathname === '/dashboard') return true;
        if (href !== '/dashboard' && pathname.startsWith(href)) return true;
        return false;
    };

    const handleNavigation = (item: MenuItem) => {
        if (onChange && item.id !== "docs") {
            onChange(item.id as ViewType);
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-zinc-950 text-slate-300 transition-all duration-300", className)}>
            <div className="flex-1 overflow-y-auto py-6 px-3 thin-scrollbar">
                <nav className="space-y-6">
                    {MENU_GROUPS.map((group) => (
                        <div key={group.title} className="space-y-2">
                            {!collapsed && (
                                <h4 className="px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 animate-in fade-in duration-300">
                                    {group.title}
                                </h4>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const active = isActive(item.href, item.id);
                                    
                                    if (item.external) {
                                        return (
                                            <Button
                                                key={item.id}
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start gap-3 px-3 h-10 font-normal text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-all",
                                                    collapsed && "justify-center px-0"
                                                )}
                                                onClick={() => window.open(item.href, "_blank")}
                                                title={item.label}
                                            >
                                                <item.icon className="h-6 w-6 shrink-0 opacity-70 group-hover:opacity-100" />
                                                {!collapsed && <span className="truncate">{item.label}</span>}
                                            </Button>
                                        );
                                    }

                                    // SPA Mode: If onChange is provided, render as Button
                                    if (onChange) {
                                        return (
                                            <Button
                                                key={item.id}
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start gap-3 px-3 h-10 font-normal text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-all",
                                                    active && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white font-medium shadow-md",
                                                    collapsed && "justify-center px-0"
                                                )}
                                                onClick={() => handleNavigation(item)}
                                                title={item.label}
                                            >
                                                <item.icon className={cn("h-6 w-6 shrink-0 opacity-70", active && "opacity-100")} />
                                                {!collapsed && <span className="truncate">{item.label}</span>}
                                            </Button>
                                        );
                                    }

                                    // Standard Link Mode
                                    return (
                                        <Link key={item.id} href={item.href} passHref className="block">
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start gap-3 px-3 h-10 font-normal text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-all",
                                                    active && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white font-medium shadow-md",
                                                    collapsed && "justify-center px-0"
                                                )}
                                                title={item.label}
                                            >
                                                <item.icon className={cn("h-6 w-6 shrink-0 opacity-70", active && "opacity-100")} />
                                                {!collapsed && <span className="truncate">{item.label}</span>}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            {/* User Profile Footer */}
            <div className="border-t border-white/10 bg-black/20 p-4">
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-xs shadow-inner ring-2 ring-white/10">
                        {(userEmail?.charAt(0) || "U").toUpperCase()}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 overflow-hidden animate-in fade-in zoom-in duration-300">
                            <p className="text-sm font-medium text-zinc-200 truncate">
                                {userEmail}
                            </p>
                            <p className="text-xs text-zinc-500 truncate font-mono">
                                {tenantId}
                            </p>
                        </div>
                    )}
                    {!collapsed && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10"
                            onClick={onSignOut}
                            title="Sign Out"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
