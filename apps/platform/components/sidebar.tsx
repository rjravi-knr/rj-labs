"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@labs/ui/lib/utils";
import {
  Home,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Users,
  Bot,
  GraduationCap,
  Settings,
  LogOut
} from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { Button } from "@labs/ui/button";
import { Separator } from "@labs/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const items = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
    },
    // Adding back items for better visual testing of collapse
    // User can remove if they really hate them, but a sidebar with 1 item is hard to verify
    {
       title: "Agents",
       href: "/dashboard/agents",
       icon: Bot,
    },
    {
       title: "Tenants",
       href: "/dashboard/tenants",
       icon: Users,
    },
    {
       title: "Learning",
       href: "/dashboard/learning",
       icon: GraduationCap,
    },
     {
       title: "Settings",
       href: "/dashboard/settings",
       icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[300px]",
        className
      )}
    >
        {/* Toggle Button in Header area of sidebar */}
      <div className="flex h-14 items-center px-3 border-b">
         { !isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold px-2 truncate">
                <span className="truncate">RJ Platform</span>
            </Link>
         )}
         <Button 
            variant="ghost" 
            size="icon" 
            className={cn("ml-auto h-8 w-8", isCollapsed && "mx-auto")}
            onClick={toggleSidebar}
         >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
         </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {items.map((item, index) => (
             <Link
                key={index}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-muted-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
          ))}
        </nav>
      </div>
      
       <div className="p-2 border-t">
          {/* Bottom actions if any */}
       </div>
    </div>
  );
}
