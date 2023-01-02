import React from "react"
import { Box, Container } from "@mui/system"
import { getAuth } from "firebase/auth"

function Profile() {
  const auth = getAuth()
  return (
    <Container sx={{ width: "90%", minHeight: "90vh", margin: "auto" }}>
      <h1>Gloat</h1>
      <h2>{auth.currentUser.displayName || "Profile"}</h2>
    </Container>
  )
}

export default Profile
