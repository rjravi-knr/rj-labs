'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@labs/ui/card"
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react"
import { getSecurityPulseAction, type SecurityPulseResult } from "../actions"
import { cn } from "@labs/ui/lib/utils"

export function SecurityPulse() {
    const [data, setData] = useState<SecurityPulseResult | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSecurityPulseAction().then(result => {
            setData(result)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <Card className="w-full animate-pulse">
                <CardHeader>
                    <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-2 bg-muted rounded w-full"></div>
                </CardContent>
            </Card>
        )
    }

    if (!data) return null

    // Determine colors based on status
    const statusColor = {
        'Excellent': 'text-green-500',
        'Good': 'text-yellow-500',
        'Fair': 'text-orange-500',
        'Critical': 'text-red-500'
    }[data.status]

    const gradient = {
        'Excellent': 'from-green-500 to-emerald-400',
        'Good': 'from-yellow-500 to-amber-400',
        'Fair': 'from-orange-500 to-red-400',
        'Critical': 'from-red-600 to-red-400'
    }[data.status]

    return (
        <Card className="w-full relative overflow-hidden border-l-4" style={{borderLeftColor: `var(--${data.status.toLowerCase()})`}}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Activity className={cn("h-5 w-5", statusColor)} />
                        Security Pulse
                    </CardTitle>
                    <span className={cn("text-lg font-bold", statusColor)}>
                        {data.score}/100
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                {/* Health Bar */}
                <div className="relative h-4 w-full bg-secondary rounded-full overflow-hidden mb-4">
                    <div 
                        className={cn("absolute top-0 left-0 h-full transition-all duration-1000 ease-out bg-gradient-to-r", gradient)}
                        style={{ width: `${data.score}%` }}
                    />
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">{data.status}</span>
                        <span>condition</span>
                    </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-500/10 text-red-500">
                             <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Recent Errors</p>
                            <p className="text-sm font-bold">{data.metrics.errorCount} events</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                             <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">MFA Adoption</p>
                            <p className="text-sm font-bold">{data.metrics.mfaAdoption}% (Mocked)</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
