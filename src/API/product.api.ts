const API_URL = "http://localhost:3030/ecatalogos"

export async function getProducts(){
    const response = await fetch(`${API_URL}/products?page=1&limit=4`)
    return response.json()
};

export async function getProductsReferences(reference: string){
    const response = await fetch(
        `${API_URL}/products?reference=${reference}`
    )

    return response.json()
}

