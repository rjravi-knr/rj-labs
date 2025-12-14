import { BaseRepository } from './base-repository';
import { Log, LogLevel } from '../models/logs';
/**
 * Repository for Logs with specialized query methods
 *
 * Example of how to extend BaseRepository for custom models
 */
export class LogsRepository extends BaseRepository {
    constructor() {
        super(Log);
    }
    /**
     * Find logs by level
     */
    async findByLevel(level, limit = 100) {
        const logs = await this.find({ level });
        return logs.slice(0, limit);
    }
    /**
     * Find error logs
     */
    async findErrors(limit = 100) {
        return this.findByLevel(LogLevel.ERROR, limit);
    }
    /**
     * Find logs by context (e.g., 'auth', 'api')
     */
    async findByContext(context, limit = 100) {
        const logs = await this.find({ context });
        return logs.slice(0, limit);
    }
    /**
     * Find logs within date range
     */
    async findByDateRange(startDate, endDate, level) {
        const filter = {
            timestamp: { $gte: startDate, $lte: endDate },
        };
        if (level) {
            filter.level = level;
        }
        return this.find(filter);
    }
    /**
     * Search logs by message (case-insensitive)
     */
    async search(query, limit = 100) {
        const logs = await this.find({
            message: { $regex: query, $options: 'i' },
        });
        return logs.slice(0, limit);
    }
    /**
     * Get error count by context
     * Useful for monitoring/dashboards
     */
    async getErrorCountByContext() {
        const results = await Log.aggregate([
            { $match: { level: LogLevel.ERROR } },
            { $group: { _id: '$context', count: { $sum: 1 } } },
            { $project: { context: '$_id', count: 1, _id: 0 } },
            { $sort: { count: -1 } },
        ]);
        return results;
    }
    /**
     * Get recent logs (default: last 100)
     */
    async getRecent(limit = 100) {
        const { getTenantContext } = await import('../../modules/tenancy/context.js');
        const tenantContext = getTenantContext();
        const filter = tenantContext ? { tenantId: tenantContext.tenantId } : {};
        return this.model
            .find(filter)
            .sort({ timestamp: -1 })
            .limit(limit)
            .exec();
    }
}
