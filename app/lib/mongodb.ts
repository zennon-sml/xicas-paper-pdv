import { MongoClient } from 'mongodb'
const dbURI = process.env.MONGODB_URI || ''
const options = {}

if (!dbURI) {
  throw new Error("MONGODB_URI not found")
}

const dbClient = new MongoClient(dbURI, options)

export default dbClient
