import React, { useState } from "react"
import { Link } from "react-router-dom"
import { formStyle, inputStyle, buttonStyle } from "../components/styles"

import { Box, Container } from "@mui/system"
import { FormControl, Input, InputLabel } from "@mui/material"
import Button from "@mui/material/Button"

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <>
      <Container sx={{ width: "90%", minHeight: "90vh", margin: "auto" }}>
        <h1>Gloat!</h1>
        <Box component="form" autoComplete="off">
          <h3>Reset Your Password</h3>
          <FormControl sx={formStyle} variant="standard">
            <InputLabel htmlFor="email">Email Address: </InputLabel>
            <Input
              sx={inputStyle}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button sx={buttonStyle} type="submit">
            Reset Password
          </Button>
        </Box>
        <h3 style={{ marginTop: "5rem" }}>
          <Link to="/signin">Sign in to your account</Link>
        </h3>
      </Container>
    </>
  )
}

export default ForgotPassword
