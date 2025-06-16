const API_URL = 'http://localhost:5000/api/sales'

export const createSale = async (saleData: any) => { // prepara saleData para enviar ao backend
  try {
    const productsToSend = saleData.map((product: any) => ({
      id: product.id,
      qtd: product.qtd,
      pUnit: product.pUnit,
      descount: product.desconto || 0
    })); 

    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({products: productsToSend})
    });
    console.log("Response: ",JSON.stringify(productsToSend))

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

// export const getProductById = async (productID: number) => {
//     const response = await fetch(API_URL+`/`+productID)
//     return await response.json()
// }

// export const getProductByBarcode = async (productBarcode: string) => {
//     const response = await fetch(API_URL+`/barcode/`+productBarcode)
//     return await response.json()
// }

// export const updateProductById = async (productID: any, updatedData: any) => {
//     const response = await fetch(API_URL+`/`+productID,{
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedData)
//     })
//     return await response.json()
// }
