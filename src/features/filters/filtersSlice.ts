import { createSlice } from "@reduxjs/toolkit"
import { productsSlice } from "../products/productsSlice"

export type Filter = string

export interface FiltersSliceState {
  entities: Record<Filter, boolean>
}

const initialState: FiltersSliceState = {
  entities: {},
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: create => ({
    toggleFilter: create.reducer<Filter>((state, action) => {
      state.entities[action.payload] = !state.entities[action.payload]
    }),
    clearFilters: create.reducer((state, action) => {
      Object.keys(state.entities).forEach(filter => {
        state.entities[filter] = false
      })
    }),
  }),
  extraReducers: builder => {
    builder.addCase(
      productsSlice.actions.loadProducts.fulfilled,
      (state, action) => {
        const lines = new Set<string>()

        action.payload.devices.forEach(product => {
          lines.add(product.line.name)
        })

        Array.from(lines).forEach(filter => {
          state.entities[filter] = false
        })
      },
    )
  },
  selectors: {
    selectFilters: state => state.entities,
    selectFilterOptions: state => {
      return Object.keys(state.entities)
    },
    selectIsSelected: (state, filter: Filter) => {
      return state.entities[filter]
    },
    selectIsFiltered: state => {
      return Object.values(state.entities).some(Boolean)
    },
  },
})
