import React, { useState } from "react"
import { Link } from "react-router-dom"
import { formStyle, inputStyle, buttonStyle } from "../components/styles"

import { Box, Container } from "@mui/system"
import { FormControl, Input, InputLabel } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputAdornment from "@mui/material/InputAdornment"
import Button from "@mui/material/Button"

function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Container sx={{ width: "90%", minHeight: "90vh", margin: "auto" }}>
        <h1>Gloat!</h1>
        <Box component="form" autoComplete="off">
          <h3>Sign In</h3>
          <FormControl sx={formStyle} variant="standard">
            <InputLabel htmlFor="email">Email Address: </InputLabel>
            <Input
              sx={inputStyle}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </FormControl>
          <FormControl sx={formStyle} variant="standard">
            <InputLabel htmlFor="password">Password: </InputLabel>
            <Input
              sx={inputStyle}
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button sx={buttonStyle} type="submit">
            Sign In
          </Button>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </Box>
        <h3 style={{ marginTop: "5rem" }}>
          <Link to="/signup">Have an account? Sign Up</Link>
        </h3>
      </Container>
    </>
  )
}

export default Signin
