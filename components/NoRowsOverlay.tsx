import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import React from "react"

const StyledGridOverlay = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  padding: 16
}))

export default function NoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <SentimentDissatisfiedIcon color="disabled" sx={{ fontSize: 72 }} />
      <Typography sx={{ mt: 2, textAlign: "center" }} color="textSecondary">
        There are no added domains. Click on the button at the top right to add
        a new domain.
      </Typography>
    </StyledGridOverlay>
  )
}
