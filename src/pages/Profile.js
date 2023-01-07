import React from "react"
import { Box, Container } from "@mui/system"
import { getAuth, signOut } from "firebase/auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

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
    <Container
      sx={{ width: "90%", minHeight: "90vh", margin: "auto", gap: "25%" }}
    >
      <header>
        <h1>Gloat</h1>
        <Box
          sx={{
            mx: "auto",
            my: "2",
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
            gap: "5%",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 100,
              width: 100,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Default Profile Picture"
            src="https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=740&t=st=1672789292~exp=1672789892~hmac=ee5648689362585b539d3bba9d306491f6694957419f4b1ecdd679feecddd8c0"
          />
          <h2 style={{ margin: "auto 0" }}>{auth.currentUser.displayName}</h2>
        </Box>
      </header>
      <br />
      <hr />
      <button onClick={signOutOfApp}>Logout</button>
    </Container>
  )
}

export default Profile
