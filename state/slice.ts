import { createSlice } from "@reduxjs/toolkit"

const domainSlice = createSlice({
  name: "domains",
  initialState: [],
  reducers: {
    addDomain: (state, action) => {
      state.push(action.payload)
    },
    deleteDomain: (state, action) => {
      return state.filter((domain) => domain.domain !== action.payload)
    },
    toggleDomain: (state, action) => {
      const domain = state.find((domain) => domain.domain === action.payload)
      if (domain) {
        domain.enabled = !domain.enabled
      }
    }
  }
})

export const { addDomain, deleteDomain, toggleDomain } = domainSlice.actions

export default domainSlice.reducer
