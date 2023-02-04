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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

import Posts from "../components/Posts"

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

      let newPost = {
        caption,
        username: auth.currentUser.displayName,
        date: new Date().getTime().toString(),
        userRef: auth.currentUser.uid,
      }

      // store image in firebase
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${auth.currentUser.userRef}-${
            image.name
          }-${uuidv4()}`
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

      if (!images == {}) {
        const imgURLS = await Promise.all(
          [...images].map((image) => storeImage(image))
        )
          .then(addDoc(collection(db, "posts"), newPost))
          .catch(() => {
            toast.error("image not uploaded")
            return
          })
        newPost = { ...newPost, imgURLS }
      } else {
        await addDoc(collection(db, "posts"), newPost)
      }

      toast.success("Your post is uploaded")
      return () => document.querySelector(".form").reset()
    } catch (error) {
      toast.error("Post not uploaded")
      // console.log(error)
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
        <Button variant="contained" component="label" style={{ width: "5%" }}>
          <AddAPhotoIcon />
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={onChange}
            multiple
            hidden
          />
        </Button>
        <Button type="submit" onClick={handleSubmit} sx={buttonStyle}>
          Share
        </Button>
      </Box>

      <Posts posts={posts} />
    </Container>
  )
}

export default Home
