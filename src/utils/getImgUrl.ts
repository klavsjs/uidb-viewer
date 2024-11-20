const IMG_SIZE = {
  sm: 40,
  md: 160,
  lg: 320,
}

export const getImgUrl = (
  productId: string,
  imageId: string,
  size: "sm" | "md" | "lg",
) => {
  return `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${productId}%2Fdefault%2F${imageId}.png&w=${IMG_SIZE[size]}&q=75`
}
