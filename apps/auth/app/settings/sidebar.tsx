"use client";

import { cn } from "@labs/ui/lib/utils";
import { Button } from "@labs/ui/button";
import { 
    LayoutDashboard, 
    Settings, 
    ShieldCheck, 
    KeyRound, 
Plug
} from "lucide-react";

export type ViewType = 
    | "dashboard" 
    | "general" 
    | "auth-config" 
    | "social" 
    | "security";

interface SidebarProps {
    activeView: ViewType;
    onChange: (view: ViewType) => void;
    className?: string;
}

const MENU_ITEMS = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard
    },
    {
        id: "general",
        label: "General Settings",
        icon: Settings
    },
    {
        id: "auth-config",
        label: "Authentication Config",
        icon: KeyRound
    },
    {
        id: "social",
        label: "Social Connectors",
        icon: Plug
    },
    {
        id: "security",
        label: "Security Setup",
        icon: ShieldCheck
    }
] as const;

export function Sidebar({ activeView, onChange, className }: SidebarProps) {
    return (
        <nav className={cn("flex flex-col space-y-1", className)}>
            {MENU_ITEMS.map((item) => (
                <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className={cn(
                        "justify-start gap-3",
                        activeView === item.id && "bg-secondary"
                    )}
                    onClick={() => onChange(item.id as ViewType)}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Button>
            ))}
        </nav>
    );
}
