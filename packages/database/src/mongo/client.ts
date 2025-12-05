import mongoose, { ConnectOptions } from 'mongoose'
import type { MongoConfig } from '../core/types'
import { ConnectionError } from '../core/errors'

// Track connection state
let isConnected = false
let connectionPromise: Promise<typeof mongoose> | null = null

/**
 * Create MongoDB client with Mongoose
 * Connection is lazy - only connects when first query is made
 */
export async function createMongoClient(config?: MongoConfig): Promise<typeof mongoose> {
  // Return existing connection if already connected
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose
  }

  // Return pending connection promise if connection in progress
  if (connectionPromise) {
    return connectionPromise
  }

  const uri = config?.uri ?? process.env.MONGODB_URL

  if (!uri) {
    throw new ConnectionError(
      'MongoDB URI is required (MONGODB_URL environment variable or config.mongo.uri)'
    )
  }

  try {
    // Configure connection options
    const options: ConnectOptions = {
      dbName: config?.dbName,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    // Start connection
    connectionPromise = mongoose.connect(uri, options)
    const conn = await connectionPromise

    isConnected = true
    connectionPromise = null

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      isConnected = false
      console.warn('MongoDB disconnected')
    })

    // Handle errors
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error)
      isConnected = false
    })

    return conn
  } catch (error) {
    connectionPromise = null
    throw new ConnectionError(
      'Failed to connect to MongoDB',
      error instanceof Error ? error : undefined
    )
  }
}

/**
 * Disconnect from MongoDB
 * Useful for cleanup in tests or graceful shutdown
 */
export async function disconnectMongo(): Promise<void> {
  if (isConnected) {
    await mongoose.disconnect()
    isConnected = false
  }
}

/**
 * Check if MongoDB is connected
 */
export function isMongoConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1
}
