import { Box } from "@mui/system"
import React from "react"
import { getAuth } from "firebase/auth"

const Post = ({ caption, username, imgURLS, profilePic, userRef, date }) => {
  return (
    <Box sx={{ my: 4 }}>
      <h1>{caption}</h1>
      <h2>
        {username},{date}
      </h2>
    </Box>
  )
}

export default Post
