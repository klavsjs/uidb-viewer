import ProductListItem from "./ProductListItem"
import type { Product } from "./productsSlice"

const ProductList = ({ products }: { products: Product[] }) => (
  <table className="flex h-full w-full flex-col overflow-hidden">
    <thead className="px-8">
      <tr className="grid grid-cols-[48px_1fr_1fr] grid-rows-[32px] items-center border-b">
        <th></th>
        <th className="text-start text-sm font-semibold">Product Line</th>
        <th className="text-start text-sm font-semibold">Name</th>
      </tr>
    </thead>
    <tbody className="overflow-y-auto px-8 pt-[2px]">
      {products.map(item => (
        <ProductListItem key={item.id} item={item} />
      ))}
    </tbody>
  </table>
)

export default ProductList
