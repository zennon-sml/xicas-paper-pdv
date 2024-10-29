//import connectToMongoDB from "../../lib/mongodb"
//import product from "../../types/product.ts"
import { NextResponse } from "next/server.js";
//export async function GET() {
//  connectToMongoDB()
//
//  return NextResponse.json({ message: 'connecting!' });
//}
//
import { NextApiRequest, NextApiResponse } from 'next';
import connectToMongoDB from '../../lib/mongodb';
import ProductModel from '../../models/product';

//export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//  await connectToMongoDB();

  export async function GET() {
    try {
      const products = await ProductModel.find();
      return NextResponse.json({ message: 'products!' });
    } catch (error) {
      return NextResponse.json({ message: 'no products :/' + error });
    }
  }
  //if (req.method === 'GET') {
  //  try {
  //    const products = await ProductModel.find();
  //    res.status(200).json(products);
  //  } catch (error) {
  //    res.status(500).json({ message: 'Error retrieving products', error });
  //  }
  //} else {
  //  res.setHeader('Allow', ['GET']);
  //  res.status(405).end(`Method ${req.method} Not Allowed`);
  //}
//}
