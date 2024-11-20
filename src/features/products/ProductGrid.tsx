import ProductGridItem from "./ProductGridItem"
import type { Product } from "./productsSlice"

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto px-8 pb-8 pt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
    {products.map(item => (
      <ProductGridItem key={item.id} item={item} />
    ))}
  </div>
)

export default ProductGrid
