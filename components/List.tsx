import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { DataGrid } from "@mui/x-data-grid"
import React, { useState } from "react"

import { useAppSelector } from "~state/store"

import Add from "./Add"
import Delete from "./Delete"
import MultiDelete from "./MultiDelete"
import MultiToggle from "./MultiToggle"
import NoRowsOverlay from "./NoRowsOverlay"
import Toggle from "./Toggle"

export default function List() {
  const domains = useAppSelector((state) => state.domains)

  const [selections, setSelections] = useState([])
  return (
    <DataGrid
      sx={{
        width: "100%",
        minHeight: 369,
        border: "none",
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important"
        },
        "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
          outline: "none !important"
        },
        "&.MuiDataGrid-root .MuiDataGrid-columnSeparator": {
          display: "none !important"
        },
        "&.MuiDataGrid-root .MuiDataGrid-selectedRowCount": {
          visibility: "visible",
          width: "auto",
          height: "auto"
        },
        "&.MuiDataGrid-root .MuiTablePagination-actions": {
          marginRight: "3px"
        },
        "&.MuiDataGrid-root .MuiDataGrid-actionsCell": {
          gridGap: 0
        },
        "--DataGrid-overlayHeight": "260px"
      }}
      rows={domains.map((domain) => ({
        id: domain.domain,
        domain: domain.domain,
        enabled: domain.enabled
      }))}
      columns={[
        {
          field: "domain",
          headerName: "Domain",
          width: 350
        },
        {
          field: "actions",
          type: "actions",
          align: "right",
          headerAlign: "right",
          width: 138,
          renderHeader: () => <Add />,
          getActions: ({ row }) => {
            return [
              <Toggle domain={row.domain} enabled={row.enabled} />,
              <Delete domain={row.domain} />
            ]
          }
        }
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5
          }
        }
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      rowSelectionModel={selections}
      onRowSelectionModelChange={setSelections}
      disableColumnMenu
      disableColumnFilter
      disableColumnResize
      autoHeight={true}
      slots={{
        noRowsOverlay: () => <NoRowsOverlay />,
        noResultsOverlay: () => <NoRowsOverlay />
      }}
      localeText={{
        footerRowSelected: (count) => (
          <Stack direction="row" alignItems="center" gap={1}>
            <MultiToggle selections={selections} />
            <Typography variant="inherit">or</Typography>
            <MultiDelete selections={selections} />
            <Typography variant="inherit">
              selected {count} domain{count === 1 ? "" : "s"}
            </Typography>
          </Stack>
        )
      }}
    />
  )
}
