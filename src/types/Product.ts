export interface Sku {
    id: number
    size: string
    stock: number
    price: string | number
    deleted_at?: string | null
}

export interface Variant{
    id: number
    name: string
    hex_code?: string | null
    skus: Sku[]
}

export interface Product{
    id: number
    name: string
    reference: string
    variants: Variant[]
}

export interface ImageProduct{
    images: string[]
}

export interface SkuQuantity{
    skus: any[]
    quantities: any
    onChange: (skuId: number, nextQuantity: number) => void
}
