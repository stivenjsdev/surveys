import mongoose from "mongoose";

interface MongooseGlobal extends globalThis.Global {
  mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

declare const global: MongooseGlobal;

const MONGODB_URI = process.env.MONGODB_URI;

const cached = global.mongoose || { conn: null, promise: null };

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  console.log("MONGODB_URI", MONGODB_URI);

  if (!MONGODB_URI) throw new Error("MongoDB URI is missing");

  const opts = {
    dbName: "surveys",
    bufferCommands: false,
  };

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, opts);

  cached.conn = await cached.promise;
  return cached.conn;
};
