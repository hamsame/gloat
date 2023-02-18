import { Box } from "@mui/system"
import React, { useState } from "react"
import { getAuth } from "firebase/auth"
import { doc, deleteDoc } from "firebase/firestore"

const Post = ({
  index,
  caption,
  username,
  imgURLS,
  profilePic,
  userRef,
  date,
}) => {
  const auth = getAuth()
  const userID = auth.currentUser.uid

  // add edit btn/ delete btn
  const deleteDoc = () => {}

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
        dataUserId={userRef}
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
      {imgURLS?.map((img, index) => {
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
            key={index}
            src={img}
          />
        )
      })}
      {userRef === userID ? (
        <button onClick={() => deleteDoc()}>delete post</button>
      ) : (
        ""
      )}
    </Box>
  )
}

export default Post
