'use server'

export type SessionStats = {
    activeSessions: number
    totalUsers: number
    liveEvents: string[]
}

const LIVE_EVENTS_POOL = [
    "New login from Paris, France",
    "User @alice updated profile",
    "Failed login attempt (Standard User)",
    "New session started in New York",
    "Admin access granted to @bob",
    "Password reset requested",
    "Device authorized: Chrome on macOS",
    "Session revoked for suspicious activity"
]

export async function getSessionStatsAction(): Promise<SessionStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock data
    // Randomize active sessions slightly to simulate "live" feel on refresh
    const baseSessions = 420
    const variance = Math.floor(Math.random() * 10) - 5 // -5 to +5
    
    // Pick 3 random events
    const events: string[] = []
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * LIVE_EVENTS_POOL.length)
        events.push(LIVE_EVENTS_POOL[randomIndex]!)
    }

    return {
        activeSessions: baseSessions + variance,
        totalUsers: 1250,
        liveEvents: events
    }
}
