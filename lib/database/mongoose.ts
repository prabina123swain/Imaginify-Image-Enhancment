import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Initialize cached as a global variable if it doesn't exist
let cached: MongooseConnection = (global as any).mongoose || { conn: null, promise: null };

// Save cached to the global object if it's not already there
(global as any).mongoose = cached;

export const connectToDatabase = async (): Promise<Mongoose | null> => {
    // Return existing connection if it's already established
    if (cached.conn) return cached.conn;

    // Throw an error if the MongoDB URL is missing
    if (!MONGODB_URL) throw new Error("Missing MongoDB URL");

    // If there is no existing promise, create a new connection promise
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: "Imaginify",
            bufferCommands: false,
        }).then((mongooseInstance) => {
            cached.conn = mongooseInstance;
            return mongooseInstance;
        }).catch((error) => {
            cached.conn = null;
            cached.promise = null;
            throw error;
        });
    }

    // Await the promise to get the connection
    cached.conn = await cached.promise;
    return cached.conn;
};
