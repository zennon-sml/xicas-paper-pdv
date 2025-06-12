const API_URL = 'http://localhost:5000/api/sales'

export const createSale = async (saleData: any) => {
  try {
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({products: saleData})
    });
    //console.log("Response: ",JSON.stringify(saleData))

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


// export const createProduct = async (productData: any) => {
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData)
//     })
//     return await response.json()
// }

// export const getAllProducts = async () => {
//     const response = await fetch(API_URL, {method: 'GET'})
//     return await response.json()
// } 

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

// export const deleteProductById = async (productID: number) => {
//     const response = await fetch(API_URL+`/`+productID, {method: 'DELETE'})
//     if (!response.ok) throw new Error('Erro ao deletar produto');   
// }