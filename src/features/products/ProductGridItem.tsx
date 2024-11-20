import { Link } from "react-router-dom"
import { getImgUrl } from "../../utils/getImgUrl"
import type { Product } from "./productsSlice"

const ProductGridItem = ({ item }: { item: Product }) => {
  const imgUrl = getImgUrl(item.id, item.images.default, "md")

  return (
    <div className="relative flex w-full flex-col rounded-lg border border-gray-100 hover:bg-black/5">
      <div className="flex h-[100px] justify-center rounded-t-lg bg-black/5">
        <img
          src={imgUrl}
          alt={item.product.name}
          className="aspect-square h-full object-contain"
        />
        <p className="absolute right-0.5 top-0.5 rounded bg-white px-1 py-0.5 text-xs text-blue-500">
          {item.line.name}
        </p>
      </div>
      <div className="flex h-full flex-col justify-between gap-4 p-2 text-black/85">
        <p className="text-sm text-black/85">{item.product.name}</p>
        <p className="text-xs text-black/45">
          {item.shortnames
            .slice(1)
            .reduce((prev, curr) => prev + ", " + curr, item.shortnames[0])}
        </p>
      </div>
      <Link
        to={`/${item.id}`}
        className="absolute left-0 top-0 h-full w-full rounded-lg outline-offset-1 outline-blue-600 focus-visible:outline"
      />
    </div>
  )
}

export default ProductGridItem
