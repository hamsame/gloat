import React, { useState, useEffect, useRef } from "react"

import { collection, getDocs, setDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth } from "firebase/auth"
import { containerStyle } from "../components/styles"
import { Box, Container } from "@mui/system"
import { toast } from "react-toastify"

function Home() {
  const isMounted = useRef(true)
  const [posts, setPosts] = useState([])
  const getPosts = async () => {
    let fetchedPosts = []
    try {
      const allPosts = await getDocs(collection(db, "posts"))
      allPosts.forEach((doc) => {
        fetchedPosts = [...fetchedPosts, doc.data()]
      })
      setPosts(fetchedPosts)
    } catch (error) {
      toast.error("error")
    }
  }

  useEffect(() => {
    if (isMounted) {
      getPosts()
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return (
    <Container sx={containerStyle}>
      <h1>Home</h1>
      <Box>
        {posts.map((post, index) => {
          const { caption, userRef, date, displayName, imgURLS } = post
          return (
            <article key={index}>
              <h3>{caption}</h3>
              <p>{displayName || "User1"}</p>
              {imgURLS.map((img, index) => {
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
            </article>
          )
        })}
      </Box>
    </Container>
  )
}

export default Home
