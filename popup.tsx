import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import React from "react"
import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

import DomainList from "~components/List"
import { persistor, store } from "~state/store"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

export default function Popup() {
  return (
    <Box sx={{ minWidth: 540, minHeight: 369 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <DomainList />
        </PersistGate>
      </Provider>
    </Box>
  )
}
