import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import { useFormik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"

import { addDomain } from "~state/slice"
import { useAppDispatch, useAppSelector } from "~state/store"

export default function () {
  const dispatch = useAppDispatch()
  const domains = useAppSelector((state) => state.domains)

  const validationSchema = Yup.object().shape({
    domain: Yup.string()
      .matches(
        /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
        "Enter a valid domain or subdomain"
      )
      .test("is-existing", "This domain already exist", (value) =>
        domains.every((d) => d.domain !== value)
      )
      .required("Domain is required")
  })

  const formik = useFormik({
    initialValues: {
      domain: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addDomain({ domain: values.domain, enabled: true }))
    }
  })

  const [open, setOpen] = useState(false)
  return (
    <>
      <Chip
        icon={<AddIcon />}
        color="primary"
        size="small"
        label="add domain"
        onClick={() => {
          setOpen(true)
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}>
        <DialogTitle>Add domain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the domain or subdomain you want to add. For example:
            google.com, mail.google.com
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="domain"
              name="domain"
              label="Domain"
              variant="standard"
              margin="dense"
              required
              autoFocus
              value={formik.values.domain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
              helperText={formik.touched.domain && formik.errors.domain}
            />
          </form>
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
              formik.handleSubmit()
            }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
