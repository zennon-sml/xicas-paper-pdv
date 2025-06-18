export interface Product {
  id?: number;
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

export interface ProductSold extends Product {
  qtd: number;
  price_sold : number;
  cost_sold: number;
  desconto: string;
}

export const defaultProduct: Product = {
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
  // add any other required fields here
};
