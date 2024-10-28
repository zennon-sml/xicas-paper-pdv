import connectToMongoDB from "../../lib/mongodb"
import product from "../../types/product.ts"
import { NextResponse } from "next/server.js";
export async function GET() {
  connectToMongoDB()

  return NextResponse.json({ message: 'connecting!' });
}
