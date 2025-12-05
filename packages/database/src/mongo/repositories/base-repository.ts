import type { Model, Document, FilterQuery, UpdateQuery } from 'mongoose'
import { getTenantContext } from '../../tenancy/context'

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
export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  /**
   * Find documents (automatically scoped to current tenant)
   */
  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    const context = getTenantContext()
    const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter
    return this.model.find(tenantFilter).exec()
  }

  /**
   * Find one document (automatically scoped to current tenant)
   */
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    const context = getTenantContext()
    const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter
    return this.model.findOne(tenantFilter).exec()
  }

  /**
   * Find by ID (automatically scoped to current tenant)
   */
  async findById(id: string): Promise<T | null> {
    const context = getTenantContext()
    if (!context) {
      return this.model.findById(id).exec()
    }
    return this.model.findOne({ _id: id, tenantId: context.tenantId } as FilterQuery<T>).exec()
  }

  /**
   * Create document (automatically adds tenantId)
   */
  async create(data: Partial<T>): Promise<T> {
    const context = getTenantContext()
    const docData = context ? { ...data, tenantId: context.tenantId } : data
    return this.model.create(docData as any)
  }

  /**
   * Create multiple documents (automatically adds tenantId)
   */
  async createMany(dataArray: Partial<T>[]): Promise<T[]> {
    const context = getTenantContext()
    const docs = context 
      ? dataArray.map(data => ({ ...data, tenantId: context.tenantId }))
      : dataArray
    return this.model.insertMany(docs as any)
  }

  /**
   * Update document (tenant-scoped)
   */
  async update(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    const context = getTenantContext()
    const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter
    return this.model.findOneAndUpdate(tenantFilter, update, { new: true }).exec()
  }

  /**
   * Delete document (tenant-scoped)
   */
  async delete(filter: FilterQuery<T>): Promise<boolean> {
    const context = getTenantContext()
    const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter
    const result = await this.model.deleteOne(tenantFilter).exec()
    return result.deletedCount > 0
  }

  /**
   * Count documents (tenant-scoped)
   */
  async count(filter: FilterQuery<T> = {}): Promise<number> {
    const context = getTenantContext()
    const tenantFilter = context ? { ...filter, tenantId: context.tenantId } : filter
    return this.model.countDocuments(tenantFilter).exec()
  }
}
