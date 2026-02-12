import styled from 'styled-components'

export const Screen = styled.div`
  background: #f0f0f0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const PhoneFrame = styled.div`
  background: white;
  width: 375px;
  min-height: 667px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #6f97a8;
  color: white;
  font-weight: bold;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

export const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

export const ImageArea = styled.div`
  position: relative;
  height: 300px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SideArrow = styled.button<{ left?: boolean }>`
  position: absolute;
  ${props => props.left ? 'left: 10px;' : 'right: 10px;'}
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`

export const MainImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`

export const ToolsBlock = styled.div`
  padding: 15px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
`

export const ToolsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

export const ToolBtn = styled.button`
  background: white;
  border: 1px solid #ddd;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: #f0f0f0;
  }
`

export const Thumbs = styled.div`
  display: flex;
  gap: 5px;
`

export const Thumb = styled.div<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#6f97a8' : '#ccc'};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? '#5a7d8c' : '#aaa'};
  }
`

export const ToolsHint = styled.div`
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`

export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background: white;
`

export const ProductInline = styled.div`
  flex: 1;
`

export const ProductName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`

export const ProductMeta = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`

export const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #6f97a8;
`

export const TotalsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-top: 1px solid #eee;
`

export const TotalBox = styled.div<{ align?: string }>`
  text-align: ${props => props.align || 'left'};
  
  div {
    font-size: 12px;
    color: #666;
  }
`

export const TotalValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`

export const CenterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const QtyBtn = styled.button`
  background: #6f97a8;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: #5a7d8c;
  }
`

export const QtyValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  min-width: 30px;
  text-align: center;
`

export const SizesArea = styled.div`
  padding: 15px;
  background: white;
  border-top: 1px solid #eee;
`

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
