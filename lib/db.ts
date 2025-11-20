//This file ensures that MongoDB connects only once, even if the serverless environment reruns 
// the code multiple times (like in Next.js API routes).
//It avoids creating multiple MongoDB connections which would otherwise cause errors and slowdowns.

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;


//If the environment variable is missing, throw an error.  
//This prevents silent failures.
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}
// **Why caching is needed**
// In serverless platforms (Vercel, Next.js API routes), the server code can run **many times**, 
// and every time it may try to reconnect to MongoDB.  
// This would create **hundreds of redundant connections.**
// So we store the connection globally.


// Try to get an existing cached connection stored globally.
// global exists across serverless function re-runs.
let cached = (global as any).mongoose;

// If nothing is cached yet, create a cache object:
// - `conn`: the actual connection  
// - `promise`: the promise that is resolving the connection
// This object is stored in **global.mongoose** so it persists between function calls.

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If a connection already exists → return it immediately. 
  if (cached.conn) return cached.conn;

  //f there is no connection promise yet, Start connecting to MongoDB  
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "ai-journal",
      })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}