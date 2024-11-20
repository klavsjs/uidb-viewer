import { useMemo, useRef, useState } from "react"
import { Popover } from "../../components/ui/Popover"
import { FieldGroup, Input } from "../../components/ui/Field"
import { SearchIcon } from "lucide-react"
import { ComboBox } from "react-aria-components"
import { type Product } from "../products/productsSlice"
import { useNavigate } from "react-router-dom"
import { ListBox, ListBoxItem } from "../../components/ui/ListBox"

export const Search = ({ products }: { products: Product[] }) => {
  const triggerRef = useRef(null)
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const searchResults = useMemo(() => {
    return searchValue
      ? products.filter(product =>
          product.product.name
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        )
      : []
  }, [products, searchValue])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  return (
    <ComboBox
      aria-label="Search"
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onOpenChange={setIsOpen}
      onSelectionChange={productId => navigate(`/${productId}`)}
    >
      <div ref={triggerRef}>
        <FieldGroup className="w-80">
          <SearchIcon aria-hidden className="ml-2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search"
            className="[&::-webkit-search-cancel-button]:hidden"
            onChange={handleSearch}
            value={searchValue}
            aria-label="Search"
          />
        </FieldGroup>
      </div>
      <Popover
        triggerRef={triggerRef}
        isOpen={isOpen && searchResults.length > 0}
      >
        <ListBox
          items={searchResults}
          selectionMode="single"
          className="max-h-80"
        >
          {product => (
            <ListBoxItem key={product.id}>{product.product.name}</ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  )
}
