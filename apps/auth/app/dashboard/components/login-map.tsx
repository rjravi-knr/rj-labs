'use client'

import { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Card, CardContent, CardHeader, CardTitle } from "@labs/ui/card"
import { getLoginLocationsAction, type LoginLocation } from "../actions"
import { Globe } from "lucide-react"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export function LoginMap() {
    const [locations, setLocations] = useState<LoginLocation[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLoginLocationsAction().then(data => {
            setLocations(data)
            setLoading(false)
        })
    }, [])

    const sizeScale = scaleLinear()
        .domain([0, 60]) // Mock count domain
        .range([4, 12])

    if (loading) {
        return (
            <Card className="col-span-2 h-[400px] animate-pulse">
                <CardHeader>
                    <CardTitle>Global Activity</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full pb-10">
                    <Globe className="h-12 w-12 text-muted-foreground/20 animate-spin" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="col-span-2 h-[450px] bg-[#0f172a] border-slate-800">
            <CardHeader className="pb-0">
                 <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-400" />
                    Live Login Activity
                 </CardTitle>
            </CardHeader>
            <CardContent className="relative h-full w-full overflow-hidden" style={{ maxHeight: '380px' }}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 120,
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#1e293b" // slate-800
                            stroke="#334155" // slate-700
                            strokeWidth={0.5}
                            style={{
                                default: { outline: "none" },
                                hover: { outline: "none", fill: "#334155" },
                                pressed: { outline: "none" },
                            }}
                            />
                        ))
                        }
                    </Geographies>

                    {locations.map((loc, i) => (
                        <Marker key={i} coordinates={loc.coordinates}>
                             <circle
                                r={sizeScale(loc.count)}
                                fill={loc.type === 'success' ? '#10b981' : '#ef4444'} // Emerald or Red
                                stroke="#ffffff"
                                strokeWidth={1}
                                style={{ opacity: 0.8 }}
                                className="animate-pulse cursor-pointer"
                            >
                                <title>{`${loc.city}: ${loc.count} ${loc.type} logins`}</title>
                            </circle>
                            <circle
                                r={sizeScale(loc.count) * 1.5}
                                fill={loc.type === 'success' ? '#10b981' : '#ef4444'}
                                style={{ opacity: 0.2 }}
                                className="animate-ping"
                            />
                        </Marker>
                    ))}
                </ComposableMap>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex gap-4 bg-black/50 p-2 rounded-md backdrop-blur-sm text-xs text-white border border-white/10">
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Success
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Failed
                     </div>
                </div>
            </CardContent>
        </Card>
    )
}
