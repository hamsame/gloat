import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formStyle, inputStyle, buttonStyle } from "../components/styles"
import { toast } from "react-toastify"
import { Box, Container } from "@mui/system"
import { FormControl, Input, InputLabel } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputAdornment from "@mui/material/InputAdornment"
import Button from "@mui/material/Button"

// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"

function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      let formCopy = { ...formData, userRef: auth.currentUser.uid }
      delete formCopy.password

      await setDoc(doc(db, "users", user.uid), formCopy)
      navigate("/profile")
    } catch (error) {
      toast.error("error")
    }
  }

  return (
    <>
      <Container sx={{ width: "90%", minHeight: "90vh", margin: "auto" }}>
        <h1>Gloat!</h1>
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <FormControl sx={formStyle} variant="standard">
            <InputLabel htmlFor="name">Name:</InputLabel>
            <Input
              sx={inputStyle}
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </FormControl>
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
          <Button sx={buttonStyle} type="submit" onClick={() => handleSubmit()}>
            Sign Up
          </Button>
        </Box>
        <h3 style={{ marginTop: "5rem" }}>
          <Link to="/signin">Have an account? Sign in</Link>
        </h3>
      </Container>
    </>
  )
}

export default Signup
