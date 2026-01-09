'use server'


export type SecurityPulseResult = {
    score: number
    status: 'Excellent' | 'Good' | 'Fair' | 'Critical'
    metrics: {
        errorCount: number
        mfaAdoption: number
    }
}

export async function getSecurityPulseAction(): Promise<SecurityPulseResult> {
    try {
        // Mock Data - Direct DB Access removed from Frontend App
        const errorCount = 12;
        const mfaAdoption = 45;

        let score = 100
        
        const errorPenalty = Math.min(errorCount * 2, 40)
        const mfaPenalty = Math.max(0, (100 - mfaAdoption) * 0.4)
        
        score = Math.round(score - errorPenalty - mfaPenalty)
        score = Math.max(0, Math.min(100, score)) // Clamp 0-100

        // 4. Determine Status
        let status: SecurityPulseResult['status'] = 'Critical'
        if (score >= 90) status = 'Excellent'
        else if (score >= 75) status = 'Good'
        else if (score >= 60) status = 'Fair'

        return {
            score,
            status,
            metrics: {
                errorCount,
                mfaAdoption
            }
        }
    } catch (error) {
        console.error('Failed to calculate security pulse:', error)
        // Return default safe values on error
        return {
            score: 0,
            status: 'Critical',
            metrics: { errorCount: 0, mfaAdoption: 0 }
        }
    }
}

export type LoginLocation = {
    city: string
    coordinates: [number, number] // [lng, lat] for react-simple-maps
    type: 'success' | 'failed'
    count: number
}

// Mock locations for demo
const MOCK_LOCATIONS: { city: string, coords: [number, number] }[] = [
    { city: "New York", coords: [-74.006, 40.7128] },
    { city: "London", coords: [-0.1276, 51.5074] },
    { city: "Tokyo", coords: [139.6917, 35.6895] },
    { city: "San Francisco", coords: [-122.4194, 37.7749] },
    { city: "Sydney", coords: [151.2093, -33.8688] },
    { city: "Singapore", coords: [103.8198, 1.3521] },
    { city: "Berlin", coords: [13.405, 52.52] },
    { city: "Sao Paulo", coords: [-46.6333, -23.5505] },
]

export async function getLoginLocationsAction(): Promise<LoginLocation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate random activity
    return MOCK_LOCATIONS.map(loc => {
        const isSuccess = Math.random() > 0.3
        return {
            city: loc.city,
            coordinates: loc.coords,
            type: isSuccess ? 'success' : 'failed',
            count: Math.floor(Math.random() * 50) + 5
        }
    })
}
