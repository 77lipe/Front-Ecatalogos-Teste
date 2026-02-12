import styled from 'styled-components'

export const NavButton = styled.button`
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface NavigationButtonsProps {
  currentIndex: number
  productsLength: number
  onPrevious: () => void
  onNext: () => void
}

export function NavigationButtons({ currentIndex, productsLength, onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <>
      <NavButton 
        onClick={onPrevious} 
        disabled={currentIndex === 0}
      >
        {"<"}
      </NavButton>
      <NavButton 
        onClick={onNext} 
        disabled={currentIndex === productsLength - 1}
      >
        {">"}
      </NavButton>
    </>
  )
}
