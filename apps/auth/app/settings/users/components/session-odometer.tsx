'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@labs/ui/card"
import { getSessionStatsAction, type SessionStats } from "../actions"
import { cn } from "@labs/ui/lib/utils"
import { Users, Wifi, Activity } from "lucide-react"

export function SessionOdometer() {
    const [stats, setStats] = useState<SessionStats | null>(null)
    const [prevSessions, setPrevSessions] = useState(0)

    useEffect(() => {
        // Initial fetch
        fetchStats()

        // Poll every 5 seconds to simulate live data
        const interval = setInterval(fetchStats, 5000)
        return () => clearInterval(interval)
    }, [])

    const fetchStats = async () => {
        const data = await getSessionStatsAction()
        setStats(prev => {
            if (prev) setPrevSessions(prev.activeSessions)
            return data
        })
    }

    if (!stats) {
        return (
            <div className="w-full h-32 bg-muted/20 animate-pulse rounded-xl mb-6 border border-border/50"></div>
        )
    }

    return (
        <Card className="mb-6 bg-gradient-to-br from-background to-muted/20 border-border/60 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Users className="w-48 h-48" />
            </div>

            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Odometer Section */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-background absolute -top-1 -right-1"></div>
                            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                <Users className="w-8 h-8" />
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                Active Sessions
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-600 border border-green-500/20">LIVE</span>
                            </p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-4xl font-black tracking-tight tabular-nums transition-all duration-500">
                                    {stats.activeSessions.toLocaleString()}
                                </h2>
                                <span className="text-sm text-muted-foreground font-medium">
                                    / {stats.totalUsers.toLocaleString()} users
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-16 bg-border/60"></div>

                    {/* Live Ticker Section */}
                    <div className="flex-1 w-full md:w-auto">
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                            <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                            <span className="font-medium text-foreground">Live Activity</span>
                        </div>
                        <div className="space-y-2">
                            {stats.liveEvents.map((event, i) => (
                                <div 
                                    key={i} 
                                    className="flex items-center gap-2 text-sm animate-in fade-in slide-in-from-right-4 duration-500" 
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                    <span className="truncate max-w-[300px]">{event}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
