import { useEffect, useState } from "react"
import { getProducts } from "../../API/product.api"
import type { Product } from "../../types/Product"

import { ProductImage } from "../../components/PurchaseComp/ProductsImage"

import { CalcAtual } from "../../utils/CalcAtual"
import { CalcAcumul } from "../../utils/CalcAcumulativo"

import { ProductSizes } from "../../components/PurchaseComp/ProductSize"

import * as S from "./style"

type quantityState = Record<number, Record<number, number >>

export default function Purchase(){
    const [products, setProducts] = useState<Product[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    const STORAGE_KEY = "purchase_qty"

    const [quantitiesByProduct, setQuantitiesByProduct] = useState<quantityState>(() => {
        try {
            const persisted = localStorage.getItem(STORAGE_KEY)
            return persisted ? JSON.parse(persisted) : {}
        } catch (error) {
            return {}
        }
    })

    useEffect(() => {
        console.log("Buscando produtos da API...")
        getProducts()
            .then(data => {
                console.log("Dados brutos da API:", JSON.stringify(data, null, 2))
                console.log("Tipo dos dados:", typeof data)
                console.log("É array?", Array.isArray(data))
                console.log("Length:", data?.length)
                
                if (Array.isArray(data) && data.length > 0) {
                    console.log("API retornou dados válidos!")
                    setProducts(data)
                } else {
                    console.log("API não retornou dados válidos, usando array vazio")
                    setProducts([])
                }
            })
            .catch(error => {
                console.error("Erro ao buscar produtos:", error)
                setProducts([])
            })
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quantitiesByProduct))
    }, [quantitiesByProduct])

    // Calcular quantidade total de todos os produtos
    useEffect(() => {
        const total = products.reduce((sum, product) => {
            const productQuantities = quantitiesByProduct[product.id] || {}
            return sum + Object.values(productQuantities).reduce((productSum, qty) => productSum + qty, 0)
        }, 0)
        setTotalQuantity(total)
    }, [quantitiesByProduct, products])

    if(!products.length) return <p>Carregando...</p>

    const product = products[currentIndex]
    
    const Skus = product?.variants?.[0]?.skus ?? []
    
    // Filtrar apenas SKUs não deletados
    const uniqueSkus = Skus.filter(sku => !sku.deleted_at)
    
    const qtyMap = quantitiesByProduct[product?.id] ?? {}

    // Funções para adicionar/remover quantidade total
    const handleIncreaseTotal = () => {
        const newTotal = totalQuantity + 1
        setTotalQuantity(newTotal)
        
        // Distribuir quantidade para o produto atual
        const availableSkus = uniqueSkus.filter(sku => sku.stock > 0)
        if (availableSkus.length > 0) {
            // Encontrar o tamanho com menor quantidade
            const currentQuantities = quantitiesByProduct[product.id] || {}
            const minQtySku = availableSkus.reduce((min, sku) => {
                const qty = currentQuantities[sku.id] || 0
                const minQty = currentQuantities[min.id] || 0
                return qty < minQty ? sku : min
            })
            
            setSkuQuantities(minQtySku.id, (currentQuantities[minQtySku.id] || 0) + 1)
        }
    }

    const handleDecreaseTotal = () => {
        if (totalQuantity === 0) return
        
        const newTotal = totalQuantity - 1
        setTotalQuantity(newTotal)
        
        // Remover quantidade do produto atual (do tamanho com maior quantidade)
        const currentQuantities = quantitiesByProduct[product.id] || {}
        const availableSkus = uniqueSkus.filter(sku => (currentQuantities[sku.id] || 0) > 0)
        
        if (availableSkus.length > 0) {
            // Encontrar o tamanho com maior quantidade
            const maxQtySku = availableSkus.reduce((max, sku) => {
                const qty = currentQuantities[sku.id] || 0
                const maxQty = currentQuantities[max.id] || 0
                return qty > maxQty ? sku : max
            })
            
            setSkuQuantities(maxQtySku.id, Math.max(0, (currentQuantities[maxQtySku.id] || 0) - 1))
        }
    }

    function setSkuQuantities(skuId: number, nextQty: number){
        setQuantitiesByProduct((prev) => ({
            ...prev,
            [product.id]: {
                ...(prev[product.id] ?? {}),
                [skuId]: nextQty
            }
        }))
    }

    const countAtual = CalcAtual(product, quantitiesByProduct)
    const countAcumul = CalcAcumul(products, quantitiesByProduct)

    const handlePrevious = () => {
        setCurrentIndex(i => Math.max(i - 1, 0))
    }

    const handleNext = () => {
        setCurrentIndex(i => Math.min(i + 1, products.length - 1))
    }

    return (
        <S.Screen>
            <S.PhoneFrame>

            <S.Header>
                <S.HeaderLeft>
                    <S.IconButton>{"<"}</S.IconButton>
                </S.HeaderLeft>

                <S.HeaderCenter>
                    <S.IconButton onClick={handlePrevious}>
                        {"<"}
                    </S.IconButton>

                    <span>(2) INVERNO FEMININO</span>

                    <S.IconButton onClick={handleNext}>
                        {">"}
                    </S.IconButton>
                </S.HeaderCenter>

                <S.HeaderRight>
                    <S.IconButton>F</S.IconButton>
                </S.HeaderRight>
            </S.Header>

            <ProductImage productId={product.id} />

            <S.ToolsBlock>
                <S.ToolsRow>
                    <S.ToolBtn>i</S.ToolBtn>
                    <S.ToolBtn>🔍</S.ToolBtn>

                    <S.ToolBtn>🛒</S.ToolBtn>
                </S.ToolsRow>

                <S.ToolsHint>Preços ilustrativos</S.ToolsHint>
            </S.ToolsBlock>

            <S.ProductRow>
                <S.ProductInline>
                    <S.ProductName>{product.name}</S.ProductName>
                    <S.ProductMeta>REF: {product.reference}</S.ProductMeta>
                </S.ProductInline>

                <S.Price>R$ {Number(uniqueSkus[0]?.price || 0).toFixed(2)}</S.Price>
            </S.ProductRow>

            <S.TotalsRow>
                <S.TotalBox align="left">
                    <div>Atual</div>
                    <S.TotalValue>R$ {countAtual.toFixed(2)}</S.TotalValue>
                </S.TotalBox>

                <S.CenterControls>
                    <S.QtyBtn onClick={handleDecreaseTotal}>-</S.QtyBtn>
                    <S.QtyValue>{totalQuantity}</S.QtyValue>
                    <S.QtyBtn onClick={handleIncreaseTotal}>+</S.QtyBtn>
                </S.CenterControls>

                <S.TotalBox align="right">
                    <div>Acumulado</div>
                    <S.TotalValue>R$ {countAcumul.toFixed(2)}</S.TotalValue>
                </S.TotalBox>
            </S.TotalsRow>

            <S.SizesArea>
                <ProductSizes 
                    skus={uniqueSkus}
                    quantities={qtyMap}
                    onChange={setSkuQuantities}
                />
            </S.SizesArea>

            </S.PhoneFrame>
        </S.Screen>
    )  
}
