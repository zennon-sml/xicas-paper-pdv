const API_URL = 'http://localhost:5000/api/products'

export const createProduct = async (productData: any) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
    console.log(response)
    return await response.json()
}

export const getAllProducts = async () => {
    const response = await fetch(API_URL, {method: 'GET'})
    return await response.json()
} 