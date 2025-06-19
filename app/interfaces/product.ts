export interface Product {
  id?: number;
  category: string;
  name: string;
  barcode: string;
  quantity: number;
  cost: number;
  description: string;
  tags: string;
  price: number;
  image?: string;
  cadCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductSold extends Product {
  qtd: number;
  price_sold : number;
  cost_sold: number;
  discount: string;
}

export const defaultProduct: ProductSold = {
  name: "",
  price: 0,
  image: "",
  category: "",
  barcode: "",
  qtd: 0,
  cost: 0,
  description: "",
  tags: "",
  cadCompleted: false,
  price_sold: 0,
  cost_sold: 0,
  discount: "",
  quantity: 0
};
