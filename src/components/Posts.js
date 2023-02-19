import React from "react"
import Post from "./Post.js"
import { Box } from "@mui/system"
import { getAuth } from "firebase/auth"

const Posts = ({ posts }) => {
  const auth = getAuth()
  const deleteDoc = () => {
    try {
      console.log("delete doc")
    } catch (error) {
      console.log("error")
    }
  }
  return (
    <Box>
      {posts.map((post, index) => {
        const { caption, userRef, date, username, imgURLS } = post
        let profilePic

        return (
          <Box key={index} sx={{ my: 4, background: " " }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                gap: "5rem",
                margin: "1rem 0",
              }}
            >
              <img
                src={
                  profilePic ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82DN9JU-hbIhhkPR-AX8KiYzA4fBMVwjLAG82fz7GLg&s"
                }
                style={{ borderRadius: "50%" }}
                alt="Profile avatar"
              />
              <p className="capitalise username">{username}</p>
            </div>
            <p>{caption}</p>
            {imgURLS?.map((img, el) => {
              return (
                <Box
                  component="img"
                  sx={{
                    height: 1000,
                    width: 1000,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    mr: "2rem",
                    my: 2,
                  }}
                  key={el}
                  src={img}
                />
              )
            })}
            {userRef === auth.currentUser.uid && (
              <button onClick={() => deleteDoc()}>delete post</button>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default Posts
