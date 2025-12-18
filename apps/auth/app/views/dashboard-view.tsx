
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@labs/ui/card";
import { Button } from "@labs/ui/button";
import { 
    Users, 
    Activity, 
    ShieldCheck, 
    MousePointerClick, 
    ArrowUpRight, 
    ArrowDownRight,
    UserPlus,
    Settings,
    LogOut,
    KeyRound
} from "lucide-react";
import { cn } from "@labs/ui/lib/utils";
import { SecurityPulse } from "../dashboard/components/security-pulse";
import { LoginMap } from "../dashboard/components/login-map";

// Mock Data for "Premium" feel until we have real analytics API
const stats = [
    {
        title: "Total Users",
        value: "12,345",
        change: "+12%",
        trend: "up",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Active Sessions",
        value: "423",
        change: "+5%",
        trend: "up",
        icon: Activity,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        title: "Login Success Rate",
        value: "99.2%",
        change: "-0.1%",
        trend: "down",
        icon: MousePointerClick,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "MFA Adoption",
        value: "45%",
        change: "+2%",
        trend: "up",
        icon: ShieldCheck,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    }
];

const recentActivity = [
    { user: "alice@example.com", action: "Login Success", time: "2 min ago", method: "Google", status: "success" },
    { user: "bob@corp.com", action: "Failed Login", time: "15 min ago", method: "Email", status: "failed" },
    { user: "charlie@startup.io", action: "Password Reset", time: "1 hour ago", method: "Email", status: "success" },
    { user: "dave@admin.net", action: "Updated Settings", time: "2 hours ago", method: "Web", status: "active" },
];

export function DashboardView() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your authentication system performance.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={cn("p-2 rounded-full", stat.bg)}>
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <span className={cn(
                                    "flex items-center mr-1",
                                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                                )}>
                                    {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-0.5"/> : <ArrowDownRight className="h-3 w-3 mr-0.5"/>}
                                    {stat.change}
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Security Pulse Widget */}
            <div className="mb-6">
                <SecurityPulse />
            </div>

            {/* Quick Actions (Moved Above Charts) */}
            <div>
                 <h3 className="text-lg font-semibold mb-3 px-1">Quick Actions</h3>
                 <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <Button variant="outline" className="h-auto py-3 px-4 justify-start gap-4 border-dashed hover:border-solid hover:bg-blue-500/5 hover:text-blue-600 hover:border-blue-500/20 group">
                        <div className="p-2 rounded-md bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-500 shrink-0">
                            <UserPlus className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-start text-left gap-0.5 min-w-0">
                            <span className="text-sm font-semibold">Add User</span>
                            <span className="text-xs text-muted-foreground font-normal truncate">Invite member</span>
                        </div>
                    </Button>

                    <Button variant="outline" className="h-auto py-3 px-4 justify-start gap-4 border-dashed hover:border-solid hover:bg-indigo-500/5 hover:text-indigo-600 hover:border-indigo-500/20 group">
                        <div className="p-2 rounded-md bg-indigo-500/10 group-hover:bg-indigo-500/20 text-indigo-500 shrink-0">
                            <Settings className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-start text-left gap-0.5 min-w-0">
                            <span className="text-sm font-semibold">Configure SSO</span>
                            <span className="text-xs text-muted-foreground font-normal truncate">Google/GitHub</span>
                        </div>
                    </Button>

                    <Button variant="outline" className="h-auto py-3 px-4 justify-start gap-4 border-dashed hover:border-solid hover:bg-amber-500/5 hover:text-amber-600 hover:border-amber-500/20 group">
                        <div className="p-2 rounded-md bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-500 shrink-0">
                             <KeyRound className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-start text-left gap-0.5 min-w-0">
                            <span className="text-sm font-semibold">MFA Policies</span>
                            <span className="text-xs text-muted-foreground font-normal truncate">Enforce 2FA</span>
                        </div>
                    </Button>

                    <Button variant="outline" className="h-auto py-3 px-4 justify-start gap-4 border-dashed hover:border-solid hover:bg-emerald-500/5 hover:text-emerald-600 hover:border-emerald-500/20 group">
                        <div className="p-2 rounded-md bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-500 shrink-0">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-start text-left gap-0.5 min-w-0">
                            <span className="text-sm font-semibold">Audit Logs</span>
                            <span className="text-xs text-muted-foreground font-normal truncate">View events</span>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Interactive Login Map */}
            <div className="mb-6 grid grid-cols-1">
                 <LoginMap />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {/* Chart Section */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Login Activity</CardTitle>
                        <CardDescription>
                            7-day authentication volume.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-[200px] flex items-end px-4 pb-4">
                         <div className="flex items-end justify-between w-full h-[180px] gap-2">
                            {[45, 67, 34, 89, 56, 78, 52].map((height, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                                    <div 
                                        className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-all relative group-hover:shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded transition-opacity">
                                            {height * 12}
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Recent Events</CardTitle>
                        <CardDescription>
                            Latest audit logs.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-5">
                            {recentActivity.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={cn(
                                        "h-8 w-8 rounded-full border flex items-center justify-center mr-3 shrink-0",
                                        item.status === 'success' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                                        item.status === 'failed' ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                        "bg-blue-500/10 border-blue-500/20 text-blue-500"
                                    )}>
                                        {item.status === 'success' ? <ShieldCheck className="h-3.5 w-3.5"/> :
                                         item.status === 'failed' ? <LogOut className="h-3.5 w-3.5 rotate-180"/> :
                                         <Activity className="h-3.5 w-3.5"/>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium leading-none truncate">{item.action}</p>
                                        <p className="text-xs text-muted-foreground truncate mt-0.5">{item.user}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                        {item.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
