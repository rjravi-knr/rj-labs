"use client";

import { cn } from "@labs/ui/lib/utils";
import { Button } from "@labs/ui/button";
import { 
    LayoutDashboard, 
    Settings, 
    ShieldCheck, 
    KeyRound, 
    Plug,
    Users,
    Activity,
    Lock,
    Globe,
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
    | "branding" // mapping to general for now or new view
    | "access-control"
    | "user-model"
    | "sessions"
    | "jwt";

interface SidebarProps {
    activeView: ViewType;
    onChange: (view: ViewType) => void;
    className?: string;
    onSignOut?: () => void;
    userEmail?: string;
    tenantId?: string;
}

type MenuItem = {
    id: ViewType | "docs";
    label: string;
    icon: any;
    external?: boolean;
    href?: string;
};

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

const MENU_GROUPS: MenuGroup[] = [
    {
        title: "Manage",
        items: [
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "users", label: "Users", icon: Users },
            { id: "logs", label: "Logs", icon: Activity },
        ]
    },
    {
        title: "Configure",
        items: [
            { id: "general", label: "Branding", icon: Globe },
            { id: "auth-config", label: "Access Control", icon: Lock },
            { id: "social", label: "SSO & Social", icon: Plug },
            { id: "user-model", label: "User Model", icon: User }, // Placeholder
            { id: "security", label: "Security", icon: ShieldCheck },
            { id: "sessions", label: "Sessions", icon: KeyRound }, // Placeholder
            { id: "jwt", label: "JWT Config", icon: Settings }, // Placeholder
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
                href: "https://docs.rj-suite.com" // Example URL
            },
        ]
    }
];

export function Sidebar({ activeView, onChange, className, onSignOut, userEmail, tenantId }: SidebarProps) {
    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex-1 overflow-y-auto py-6 px-3 thin-scrollbar">
                <nav className="space-y-6">
                    {MENU_GROUPS.map((group) => (
                        <div key={group.title} className="space-y-2">
                            <h4 className="px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                {group.title}
                            </h4>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3 px-3 h-11 font-normal text-zinc-400 hover:text-zinc-50 hover:bg-white/5 transition-all",
                                            activeView === item.id && !item.external && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white font-medium shadow-md"
                                        )}
                                        onClick={() => {
                                            if (item.external && item.href) {
                                                window.open(item.href, "_blank");
                                            } else {
                                                onChange(item.id as ViewType);
                                            }
                                        }}
                                    >
                                        <item.icon className="h-5 w-5 shrink-0 opacity-80" />
                                        <span className="truncate">{item.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            {/* User Profile Footer */}
            <div className="border-t border-white/10 bg-zinc-900/50 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-xs shadow-inner">
                        {(userEmail?.charAt(0) || "U").toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-zinc-200 truncate">
                            {userEmail}
                        </p>
                        <p className="text-xs text-zinc-500 truncate font-mono">
                            {tenantId}
                        </p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10"
                        onClick={onSignOut}
                        title="Sign Out"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
