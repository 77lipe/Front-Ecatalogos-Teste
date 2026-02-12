import styled from 'styled-components'

export const ProductHeaderContainer = styled.div`
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

interface ProductHeaderProps {
  currentIndex: number
  productsLength: number
  onPrevious: () => void
  onNext: () => void
}

export function ProductHeader({ currentIndex, productsLength, onPrevious, onNext }: ProductHeaderProps) {
  return (
    <ProductHeaderContainer>
      <HeaderLeft>
        <IconButton>{"<"}</IconButton>
      </HeaderLeft>

      <HeaderCenter>
        <IconButton onClick={onPrevious}>
          {"<"}
        </IconButton>

        <span>(2) INVERNO FEMININO</span>

        <IconButton onClick={onNext}>
          {">"}
        </IconButton>
      </HeaderCenter>

      <HeaderRight>
        <IconButton>F</IconButton>
      </HeaderRight>
    </ProductHeaderContainer>
  )
}
