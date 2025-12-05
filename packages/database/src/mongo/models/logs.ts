import { Schema, model, type Document } from 'mongoose'

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

/**
 * Log document interface
 */
export interface ILog extends Document {
  tenantId: string
  level: LogLevel
  message: string
  context?: string // e.g., 'auth', 'api', 'database'
  metadata?: Record<string, any>
  userId?: string
  errorStack?: string
  timestamp: Date
  createdAt: Date
}

/**
 * Logs schema for application logging
 */
const LogSchema = new Schema<ILog>(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    level: {
      type: String,
      required: true,
      enum: Object.values(LogLevel),
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    context: {
      type: String,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    userId: {
      type: String,
      index: true,
    },
    errorStack: {
      type: String,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'logs',
  }
)

// Compound index for efficient queries
LogSchema.index({ tenantId: 1, level: 1, timestamp: -1 })
LogSchema.index({ tenantId: 1, context: 1, timestamp: -1 })

// TTL index - automatically delete logs older than 90 days
// Apps can override this by setting a different TTL or removing the index
LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 })

/**
 * Log model
 */
export const Log = model<ILog>('Log', LogSchema)

/**
 * Type for creating new logs (without Mongoose Document methods)
 */
export type CreateLogInput = Omit<ILog, keyof Document | 'createdAt' | 'timestamp'> & {
  timestamp?: Date
}
