import { getTenantContext } from '../../modules/tenancy/context';
/**
 * Base repository class with tenant-aware CRUD operations
 *
 * Apps can extend this to create custom repositories:
 *
 * @example
 * ```typescript
 * class UserEventsRepository extends BaseRepository<IUserEvent> {
 *   constructor() {
 *     super(UserEvent)
 *   }
 *
 *   async findByEventType(type: string) {
 *     return this.find({ eventType: type })
 *   }
 * }
 * ```
 */
export class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    /**
     * Find documents (automatically scoped to current tenant)
     */
    async find(filter = {}) {
        const context = getTenantContext();
        const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter;
        return this.model.find(tenantFilter).exec();
    }
    /**
     * Find one document (automatically scoped to current tenant)
     */
    async findOne(filter) {
        const context = getTenantContext();
        const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter;
        return this.model.findOne(tenantFilter).exec();
    }
    /**
     * Find by ID (automatically scoped to current tenant)
     */
    async findById(id) {
        const context = getTenantContext();
        if (!context) {
            return this.model.findById(id).exec();
        }
        return this.model.findOne({ _id: id, tenantId: context.tenantId }).exec();
    }
    /**
     * Create document (automatically adds tenantId)
     */
    async create(data) {
        const context = getTenantContext();
        const docData = context ? { ...data, tenantId: context.tenantId } : data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.model.create(docData);
    }
    /**
     * Create multiple documents (automatically adds tenantId)
     */
    async createMany(dataArray) {
        const context = getTenantContext();
        const docs = context
            ? dataArray.map(data => ({ ...data, tenantId: context.tenantId }))
            : dataArray;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.model.insertMany(docs);
    }
    /**
     * Update document (tenant-scoped)
     */
    async update(filter, update) {
        const context = getTenantContext();
        const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter;
        return this.model.findOneAndUpdate(tenantFilter, update, { new: true }).exec();
    }
    /**
     * Delete document (tenant-scoped)
     */
    async delete(filter) {
        const context = getTenantContext();
        const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter;
        const result = await this.model.deleteOne(tenantFilter).exec();
        return result.deletedCount > 0;
    }
    /**
     * Count documents (tenant-scoped)
     */
    async count(filter = {}) {
        const context = getTenantContext();
        const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter;
        return this.model.countDocuments(tenantFilter).exec();
    }
}
