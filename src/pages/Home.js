import React, { useState, useEffect, useRef } from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth } from "firebase/auth"
import { containerStyle } from "../components/styles"
import { Box, Container } from "@mui/system"
import { toast } from "react-toastify"
import { FormControl, Input, InputLabel, Button } from "@mui/material"
import { formStyle, buttonStyle } from "../components/styles"

function Home() {
  const [caption, setCaption] = useState("")
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

  const onChange = (e) => {
    setCaption(e.target.value)
  }

  // const handleSubmit = () => {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const username = auth.currentUser.displayName
      const userRef = auth.currentUser.uid

      let newPost = {
        caption,
        username,
        date: new Date().getTime().toString(),
        userRef,
      }

      await setDoc(doc(db, "posts", newPost.date), newPost)

      toast.success("Your post is uploaded")
      return () => document.querySelector(".form").reset()
    } catch (error) {
      toast.error("Post not uploaded")
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
      <Box
        component="form"
        className="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: "4fr 1fr",
          gap: "1.2rem",
        }}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="caption">Caption</InputLabel>
          <Input
            sx={{ width: 1 }}
            type="caption"
            id="caption"
            name="caption"
            value={caption}
            onChange={onChange}
          />
        </FormControl>
        <Button
          type="submit"
          onClick={handleSubmit}
          sx={buttonStyle}
          style={{ width: "50%" }}
        >
          Share
        </Button>
      </Box>

      <Box>
        {posts.map((post, index) => {
          const { caption, userRef, date, displayName, imgURLS } = post
          return (
            <article key={index}>
              <h3>{caption && caption}</h3>
              <p>{displayName || "User1"}</p>
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
            </article>
          )
        })}
      </Box>
    </Container>
  )
}

export default Home
