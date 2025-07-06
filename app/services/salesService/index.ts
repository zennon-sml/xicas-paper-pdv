const API_URL = 'http://localhost:5000/api/sales'

import { ProductSold, GeneralSale } from "@/app/interfaces/product";

export const createSale = async (saleData: GeneralSale) => { // prepara saleData para enviar ao backend
  try {
    //console.log("SaleDAta:", saleData);
    // Formata os produtos para envio
    const productsToSend = saleData.products.map((product: ProductSold) => ({
      id: product.id,
      name_sold: product.name_sold,
      quantity_sold: product.quantity_sold,
      price_sold: product.price_sold,
      cost_sold: product.cost_sold,
      discount: product.discount || 0
    })); 

    // Prepara todos os dados para envio
    const bodyToSend = {
      products: productsToSend,
      payment_types: saleData.paymentTypes,
      general_discount: saleData.generalDiscount
    };
    //console.log("bodyToSend:", bodyToSend);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyToSend)
    });
    //console.log("Response: ", JSON.stringify({products: bodyToSend}));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao criar venda');
    }
    
    return await response.json();
  } catch (err: any) {
    console.error('Erro ao enviar venda:', err.message);
    return { error: err.message };
  }
};


export const getAllSales = async () => {
    const response = await fetch(API_URL, { method: 'GET' })
    return response.json()
}

export const deleteSaleById = async (saleID: number) => {
    const response = await fetch(API_URL+`/`+saleID, {method: 'DELETE'})
    if (!response.ok) throw new Error('Erro ao deletar produto');   
}