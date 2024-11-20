import { LayoutGridIcon, ListIcon } from "lucide-react"
import { useAppDispatch } from "../../app/hooks"
import { Filters } from "../filters/Filters"
import { type Product, productsSlice, type View } from "./productsSlice"
import { ToggleButton } from "../../components/ui/ToggleButton"
import { Search } from "../search/Search"

const ProductsHeader = ({
  productsCount,
  selectedView,
  products,
}: {
  productsCount: number
  selectedView: View
  products: Product[]
}) => {
  const dispatch = useAppDispatch()

  const handleListClick = () => {
    dispatch(productsSlice.actions.changeView("list"))
  }

  const handleGridClick = () => {
    dispatch(productsSlice.actions.changeView("grid"))
  }

  const isListSelected = selectedView === "list"

  return (
    <aside className="flex justify-between px-8 py-4">
      <div className="flex items-center gap-4">
        <Search products={products} />
        <p className="text-xs font-light text-gray-400">
          <span className="inline-block w-8 text-end">{productsCount}</span>{" "}
          Devices
        </p>
        <Filters />
      </div>
      <div className="flex gap-1">
        <ToggleButton
          isSelected={isListSelected}
          isDisabled={isListSelected}
          onPress={handleListClick}
        >
          <ListIcon strokeWidth={1} />
        </ToggleButton>
        <ToggleButton
          isSelected={!isListSelected}
          isDisabled={!isListSelected}
          onPress={handleGridClick}
        >
          <LayoutGridIcon strokeWidth={1} />
        </ToggleButton>
      </div>
    </aside>
  )
}

export default ProductsHeader
