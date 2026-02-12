import styled from 'styled-components'
import { useState } from 'react'
import { getProductImages } from '../../utils/mockImages'

export const ProductImageContainer = styled.div`
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
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const MainImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`

export const Thumbs = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
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

interface ProductImageProps {
  productId: number
}

export function ProductImage({ productId }: ProductImageProps) {
  const images = getProductImages(productId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const handlePrevious = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
  }
  
  const handleNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length)
  }
  
  const handleThumbClick = (index: number) => {
    setCurrentImageIndex(index)
  }
  
  return (
    <ProductImageContainer>
      <SideArrow left onClick={handlePrevious}>
        {"<"}
      </SideArrow>
      <MainImage src={images[currentImageIndex]} alt="produto" />
      <SideArrow onClick={handleNext}>
        {">"}
      </SideArrow>
      <Thumbs>
        {images.map((_, index) => (
          <Thumb
            key={index}
            active={index === currentImageIndex}
            onClick={() => handleThumbClick(index)}
          />
        ))}
      </Thumbs>
    </ProductImageContainer>
  )
}
