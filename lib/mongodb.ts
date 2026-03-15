import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
console.log("MONGODB_URI:", MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  if (global.mongoose?.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose?.promise) {
    global.mongoose!.promise = mongoose
      .connect(MONGODB_URI)
      .then((m) => {
      console.log("MongoDB connected successfully");
      return m as Mongoose;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  global.mongoose!.conn = await global.mongoose!.promise;
  return global.mongoose!.conn as Mongoose;
}

export default connectToDatabase;
