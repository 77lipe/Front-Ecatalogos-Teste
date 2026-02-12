import type { Product } from "../types/Product"

export function CalcAcumul(products: Product[], quantitiesByProduct: Record<number, Record<number, number>>): number {
    return products.reduce((total, product) => {
        const qtyMap = quantitiesByProduct[product.id] ?? {}
        const skus = product.variants?.[0]?.skus ?? []
        
        // Filtrar apenas SKUs não deletados
        const activeSkus = skus.filter(sku => !sku.deleted_at)
        
        const productTotal = activeSkus.reduce((subtotal, sku) => {
            const qty = qtyMap[sku.id] ?? 0
            const price = parseFloat(sku.price as string) || 0
            return subtotal + (qty * price)
        }, 0)
        
        return total + productTotal
    }, 0)
}
