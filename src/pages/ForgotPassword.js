import React, { useState } from "react"
import { Link } from "react-router-dom"
import { formStyle, inputStyle, buttonStyle } from "../components/styles"

import { Box, Container } from "@mui/system"
import { FormControl, Input, InputLabel } from "@mui/material"
import Button from "@mui/material/Button"

import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Password Reset Email Sent!")
      setEmail("")
    } catch (error) {
      toast.error("Enter your email")
    }
  }
  return (
    <>
      <Container sx={{ width: "90%", minHeight: "90vh", margin: "auto" }}>
        <h1>Gloat!</h1>
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
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
