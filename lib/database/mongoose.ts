import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { 
    conn: null, 
    promise: null 
  };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  console.log("Inside connecting DB cached-> ", cached, "MongoDB URL->", MONGODB_URL);

  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL).then((mongooseInstance) => {
    console.log("Database connected successfully");
    return mongooseInstance;
  }).catch((err) => {
    console.log("Error in connecting DB: ", err.message);
    process.exit(1);
  });

  console.log("Before cached =", cached);
  cached.conn = await cached.promise;
  console.log("After cached =", cached);
  
  return cached.conn;
};
