import styled from 'styled-components'
import type { SkuQuantity } from '../../types/Product'

export const SizePills = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`

export const SizePill = styled.div`
  flex: 1;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
`

export const SizeLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`

export const SizeQty = styled.div`
  font-size: 12px;
  color: #666;
`

export const PackBox = styled.div`
  background: #6f97a8;
  color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  
  div {
    font-size: 12px;
    margin-bottom: 2px;
  }
`

export const PackValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`

interface ProductSizesProps extends SkuQuantity {
  packSize?: number
}

export function ProductSizes({ skus, quantities, onChange, packSize = 4 }: ProductSizesProps) {
  const sizes = ["P", "M", "G", "GG"]
  
  // Filtrar apenas SKUs não deletados
  const activeSkus = skus.filter(sku => !sku.deleted_at)
  
  return (
    <>
      <SizePills>
        {sizes.map((size) => {
          const sku = activeSkus.find(s => s.size === size)
          const quantity = sku ? quantities[sku.id] || 0 : 0
          
          return (
            <SizePill key={size}>
              <SizeLabel>{size}</SizeLabel>
              <SizeQty>{quantity}</SizeQty>
            </SizePill>
          )
        })}
      </SizePills>

      <PackBox>
        <div>PACK</div>
        <PackValue>{packSize}</PackValue>
      </PackBox>
    </>
  )
}
