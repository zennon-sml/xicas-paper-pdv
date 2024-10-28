import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not found")
}

export default async function connectToMongoDB() {
  console.log()
//TODO connect to mongo
}

