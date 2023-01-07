import { blue, grey } from "@mui/material/colors"

const formStyle = {
  display: "block",
  mx: "auto",
  my: "2vh",
}
const inputStyle = {
  width: "40%",
  my: "1rem",
  mx: "auto",
}

const buttonStyle = {
  background: blue[700],
  color: grey[50],
  "&:hover": {
    backgroundColor: blue[900],
  },
}

export { formStyle, inputStyle, buttonStyle }
