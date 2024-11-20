import { useEffect } from "react"
import type { PropsWithChildren } from "react"
import { useAppDispatch } from "./app/hooks"
import { productsSlice } from "./features/products/productsSlice"
import logoUrl from "../logo.svg"
import { Link } from "react-router-dom"

const Root = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(productsSlice.actions.loadProducts())
  }, [dispatch])

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-[50px] items-center justify-between bg-gray-100 pr-8">
        <div className="flex items-center gap-2 p-[5px]">
          <Link
            to="/"
            className="outline-offset-1 outline-blue-600 focus-within:outline"
          >
            <img src={logoUrl} alt="Ubiquiti logo" />
          </Link>
          <p className="text-sm text-gray-400">Devices</p>
        </div>
        <p className="text-sm text-gray-400">Klavs Jurciks</p>
      </header>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default Root
