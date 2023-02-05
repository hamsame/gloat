import React from "react"
import Post from "./Post.js"
import { Box } from "@mui/system"

const Posts = ({ posts }) => {
  return (
    <Box>
      {posts.map((post, index) => {
        const { caption, userRef, date, username, imgURLS } = post
        return (
          <Post
            key={index}
            index={index}
            caption={caption}
            username={username}
            imgURLS={imgURLS}
          />
        )
      })}
    </Box>
  )
}

export default Posts
