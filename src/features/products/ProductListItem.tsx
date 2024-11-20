import { Link } from "react-router-dom"
import type { Product } from "./productsSlice"
import { getImgUrl } from "../../utils/getImgUrl"

const ProductListItem = ({ item }: { item: Product }) => {
  const imgUrl = getImgUrl(item.id, item.images.default, "sm")

  return (
    <tr
      key={item.id}
      className="relative grid grid-cols-[48px_1fr_1fr] grid-rows-[32px] items-center border-b last:border-none hover:bg-gray-100"
    >
      <td className="h-full p-1">
        <img
          src={imgUrl}
          alt={item.product.name}
          className="aspect-square h-full"
        />
        <Link
          to={`/${item.id}`}
          className="absolute left-0 top-0 h-full w-full outline-offset-1 outline-blue-500 focus-visible:outline"
        />
      </td>
      <td className="py-2 text-sm text-black/45">{item.line.name}</td>
      <td className="py-2 text-sm text-black/45">{item.product.name}</td>
    </tr>
  )
}

export default ProductListItem
