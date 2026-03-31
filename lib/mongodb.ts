import mongoose from 'mongoose';
import type { Db } from 'mongodb';

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;


// Initialize the cache on the global object to persist across hot reloads in development
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 * Returns the native MongoDB `Db` instance so callers can use `db.collection(...)`.
 */
async function connectDB(): Promise<Db> {
  // Return existing native db if available
  if (cached.conn && cached.conn.connection && cached.conn.connection.db) {
    return cached.conn.connection.db as Db;
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    // Validate MongoDB URI exists
    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }
    const options = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection to establish
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error to allow retry
    cached.promise = null;
    throw error;
  }

  // Return the native MongoDB Db instance
  if (!cached.conn || !cached.conn.connection.db) {
    throw new Error('Failed to obtain native MongoDB db instance');
  }

  return cached.conn.connection.db as Db;
}

export default connectDB;