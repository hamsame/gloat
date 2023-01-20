import React, { useState, useEffect, useRef } from "react"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth } from "firebase/auth"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { containerStyle } from "../components/styles"
import { Box, Container } from "@mui/system"
import { toast } from "react-toastify"
import { FormControl, Input, InputLabel, Button } from "@mui/material"
import { buttonStyle } from "../components/styles"

function Home() {
  const [formData, setFormData] = useState({
    caption: "",
    images: {},
  })
  const { caption, images } = formData

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
    if (e.target.files) {
      setFormData({ ...formData, images: e.target.files })
    }
    if (!e.target.files) {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  }

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

      // store image in firebase
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${userRef}-${image.name}-${uuidv4()}`
          const storageRef = ref(storage, "images/" + fileName)
          const uploadTask = uploadBytesResumable(storageRef, image)

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log("Upload is " + progress + "% done")
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused")
                  break
                case "running":
                  console.log("Upload is running")
                  break
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
              })
            }
          )
        })
      }
      const imgURLS = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        toast.error("image not uploaded")
        return
      })
      newPost = { ...newPost, imgURLS }

      await addDoc(collection(db, "posts"), newPost)

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
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={onChange}
          multiple
        />
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
