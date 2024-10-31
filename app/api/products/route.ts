import { NextResponse } from "next/server.js";
import dbClient from "@/app/lib/mongodb";
import ProductModel from '../../models/product';

  export async function GET() {
    //try {
    //  const products = await ProductModel.find();
    //  return NextResponse.json({ message: 'products!' });
    //} catch (error) {
    //  return NextResponse.json({ message: 'no products :/' + error });
    //}
    try {
      const client = dbClient;
      const db = client.db("xicasdb"); // Replace with your database name

      // Example query
      const products = await db.collection("products").find({}).toArray();
      console.log(products) 

      return NextResponse.json({ products })
    } catch (error) {
      console.error("MongoDB connection error:", error);
      return NextResponse.json(error)
    }
  }
