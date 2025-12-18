'use server'

import { LogsRepository, createMongoClient } from '@labs/database'
import { LogLevel } from '@labs/database'

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
        await createMongoClient({ uri: process.env.MONGODB_URL || 'mongodb://localhost:27017/rj-suite' })
        const logsRepo = new LogsRepository()

        // 1. Get Error Logs (Last 24h)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const errorLogs = await logsRepo.findByDateRange(oneDayAgo, new Date(), LogLevel.ERROR)
        const errorCount = errorLogs.length

        // 2. Get MFA Adoption (MOCKED for now as User schema lacks mfaEnabled)
        // TODO: Replace with real DB query when schema supports it
        const mfaAdoption = 45 // 45%

        // 3. Calculate Score
        // Base: 100
        // Penalty: 2 points per error (Max 40 penalty)
        // Penalty: (100 - MFA) * 0.4 (Max 40 penalty)
        
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
