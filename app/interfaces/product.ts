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
  name_sold: string;
  quantity_sold: number;
  price_sold: number;
  cost_sold: number;
  discount: number;
}

export interface GeneralSale {
  products: ProductSold[];
  paymentTypes: Payment;
  generalDiscount: number;
}

export interface Payment {
  money: number;
  pix: number;
  debit: number;
  credit: number;
  other: number;
}

export const defaultProduct: ProductSold = {
  name: "",
  name_sold: "",
  price: 0,
  image: "",
  category: "",
  barcode: "",
  quantity_sold: 0,
  cost: 0,
  description: "",
  tags: "",
  cadCompleted: false,
  price_sold: 0,
  id: 0,
  cost_sold: 0,
  discount: 0,
  quantity: 0
};
