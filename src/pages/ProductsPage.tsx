import { useAppSelector } from "../app/hooks"
import { filtersSlice } from "../features/filters/filtersSlice"
import ProductGrid from "../features/products/ProductGrid"
import ProductList from "../features/products/ProductList"
import ProductsHeader from "../features/products/ProductsHeader"
import { productsSlice } from "../features/products/productsSlice"

const ProductsPage = () => {
  const products = useAppSelector(productsSlice.selectors.selectProducts)
  const status = useAppSelector(productsSlice.selectors.selectProductsStatus)
  const selectedView = useAppSelector(productsSlice.selectors.selectView)
  const filters = useAppSelector(filtersSlice.selectors.selectFilters)
  const isFiltered = useAppSelector(filtersSlice.selectors.selectIsFiltered)

  const filteredProducts = isFiltered
    ? products.filter(product => {
        return filters[product.line.name]
      })
    : products

  if (status === "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-black/45">Loading...</p>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-black/45">Error loading products</p>
      </div>
    )
  }

  return (
    <>
      <ProductsHeader
        productsCount={filteredProducts.length}
        selectedView={selectedView}
        products={filteredProducts}
      />
      {selectedView === "list" && <ProductList products={filteredProducts} />}
      {selectedView === "grid" && <ProductGrid products={filteredProducts} />}
    </>
  )
}

export default ProductsPage
