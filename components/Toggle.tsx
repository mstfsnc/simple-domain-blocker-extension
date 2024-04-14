import Switch from "@mui/material/Switch"
import { GridActionsCellItem } from "@mui/x-data-grid"
import React from "react"

import { toggleDomain } from "~state/slice"
import { useAppDispatch } from "~state/store"

export default function Action({ domain, enabled }) {
  const dispatch = useAppDispatch()
  return (
    <GridActionsCellItem
      icon={<Switch size="small" checked={enabled} />}
      label="Toggle"
      onClick={() => {
        dispatch(toggleDomain(domain))
      }}
    />
  )
}
