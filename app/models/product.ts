import { Schema, model, models } from 'mongoose';
import { Product } from '../interfaces/product';

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProductModel = models.Product || model<Product>('Product', productSchema);

export default ProductModel;

