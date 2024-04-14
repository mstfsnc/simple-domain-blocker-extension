import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import React, { useState } from "react"

import { deleteDomain } from "~state/slice"
import { useAppDispatch } from "~state/store"

export default function Action({ selections }) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Chip
        size="small"
        label="delete"
        variant="outlined"
        onClick={() => {
          setOpen(true)
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}>
        <DialogTitle>Delete domains</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selections.length > 1 ? (
              <>
                Are you sure you want to delete <b>{selections.length}</b>{" "}
                domains?
              </>
            ) : (
              <>
                Are you sure you want to delete <strong>{selections[0]}</strong>
                ?
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, mb: 1, justifyContent: "space-between" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setOpen(false)
            }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              selections.forEach((selection) => {
                dispatch(deleteDomain(selection))
              })
            }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
