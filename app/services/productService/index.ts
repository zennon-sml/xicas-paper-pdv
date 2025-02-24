const API_URL = 'http://localhost:5000/api/products'

export const createProduct = async (productData: any) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
    return await response.json()
}

export const getAllProducts = async () => {
    const response = await fetch(API_URL, {method: 'GET'})
    return await response.json()
} 

export const getProductById = async (productID: number) => {
    const response = await fetch(API_URL+`/`+productID)
    return await response.json()
}

export const getProductByBarcode = async (productBarcode: string) => {
    const response = await fetch(API_URL+`/barcode/`+productBarcode)
    return await response.json()
}

export const updateProductById = async (productID: any, updatedData: any) => {
    const response = await fetch(API_URL+`/`+productID,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    return await response.json()
}

export const deleteProductById = async (productID: number) => {
    const response = await fetch(API_URL+`/`+productID, {method: 'DELETE'})
    if (!response.ok) throw new Error('Erro ao deletar produto');   
}