/* export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
} */

export interface Product {
  _id?: number;
  category: string;
  name: string;
  barcode: string;
  qtd: number;
  cost: number;
  description: string;
  tags: string;
  price: number;
  image?: string;
  cadCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
