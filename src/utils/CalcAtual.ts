import type { Product } from "../types/Product"

export function CalcAtual(product: Product, quantitiesByProduct: Record<number, Record<number, number>>): number {
    const qtyMap = quantitiesByProduct[product.id] ?? {}
    const skus = product.variants?.[0]?.skus ?? []
    
    // Filtrar apenas SKUs não deletados
    const activeSkus = skus.filter(sku => !sku.deleted_at)
    
    return activeSkus.reduce((total, sku) => {
        const qty = qtyMap[sku.id] ?? 0
        const price = parseFloat(sku.price as string) || 0
        return total + (qty * price)
    }, 0)
}
