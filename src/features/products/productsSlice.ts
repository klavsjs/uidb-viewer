import { createAppSlice } from "../../app/createAppSlice"

export interface Product {
  id: string
  line: { id: string; name: string }
  product: { name: string; abbrev: string }
  images: { default: string }
  shortnames: string[]
  unifi: {
    network: {
      numberOfPorts: number
      ethernetMaxSpeedMegabitsPerSecond: number
    }
  }
}

export type View = "list" | "grid"

export interface ProductsSliceState {
  entities: Product[]
  status: "idle" | "loading" | "failed"
  view: View
}

const initialState: ProductsSliceState = {
  entities: [],
  status: "idle",
  view: "list",
}

export const productsSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: create => ({
    loadProducts: create.asyncThunk(
      async () => {
        const response = await fetch(
          "https://static.ui.com/fingerprint/ui/public.json",
        )
        const data: { devices: Product[] } = await response.json()
        return data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.entities = action.payload.devices
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    changeView: create.reducer<View>((state, action) => {
      state.view = action.payload
    }),
  }),
  selectors: {
    selectProducts: state => state.entities,
    selectProductsStatus: state => state.status,
    selectProductsCount: state => state.entities.length,
    selectView: state => state.view,
  },
})
