import React from "react"
import { Box, Container } from "@mui/system"
import { getAuth, signOut } from "firebase/auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const signOutOfApp = () => {
    try {
      signOut(auth)
      navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container sx={{ width: "90%", minHeight: "90vh", margin: "auto" }}>
      <h1>Gloat</h1>
      <h2>{auth.currentUser.displayName || "Profile"}</h2>
      <button onClick={signOutOfApp}>Logout</button>
    </Container>
  )
}

export default Profile
