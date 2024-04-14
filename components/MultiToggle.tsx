import Chip from "@mui/material/Chip"
import React from "react"

import { toggleDomain } from "~state/slice"
import { useAppDispatch } from "~state/store"

export default function MultiToggle({ selections }) {
  const dispatch = useAppDispatch()
  return (
    <Chip
      size="small"
      label="toggle"
      variant="outlined"
      onClick={() => {
        selections.forEach((selection) => {
          dispatch(toggleDomain(selection))
        })
      }}
    />
  )
}
