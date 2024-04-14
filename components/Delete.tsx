import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { GridActionsCellItem } from "@mui/x-data-grid"
import React, { useState } from "react"

import { deleteDomain } from "~state/slice"
import { useAppDispatch } from "~state/store"

export default function Action({ domain }) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  return (
    <>
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => {
          setOpen(true)
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}>
        <DialogTitle>Delete domain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{domain}</strong>?
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
              dispatch(deleteDomain(domain))
            }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
