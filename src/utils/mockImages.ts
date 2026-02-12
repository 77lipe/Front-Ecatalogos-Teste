// Serviço de imagens reais para produtos
export const mockImages = {
  // Imagens reais do Produto 1: Camiseta branca One Piece
  product1: [
    "/images/images.png",      // Imagem principal da camiseta branca
    "/images/placeholder.png", // Segunda vista/detalhe
    "/images/images.png"       // Terceira vista (usando a mesma por enquanto)
  ],
  // Imagens reais do Produto 2: Camiseta preta Chainsaw Man
  product2: [
    "/images/placeholder.png", // Imagem principal da camiseta preta
    "/images/images.png",      // Segunda vista/detalhe
    "/images/placeholder.png"  // Terceira vista
  ]
}

// Função para obter imagens de um produto
export function getProductImages(productId: number): string[] {
  switch (productId) {
    case 43:
      return mockImages.product1
    case 44:
      return mockImages.product2
    default:
      return mockImages.product1 // Default para outros produtos
  }
}

// Função para obter a imagem principal de um produto
export function getMainProductImage(productId: number): string {
  const images = getProductImages(productId)
  return images[0] || mockImages.product1[0]
}
