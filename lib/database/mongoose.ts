import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  console.log("inside connecting DB cached-> ",cached,"mongoDB Url->",MONGODB_URL);
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
   .then(()=>{
    console.log("DataBase connected successfully");
  })
  .catch((err)=>{
    console.log("error in connecting db: ",err.message);
    process.exit(1);
  })
  console.log("Before cached =",cached);
  cached.conn = await cached.promise;
console.log("After cached =",cached);
  return cached.conn;
}
