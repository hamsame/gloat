import React, { useState, useEffect } from "react"
import { FormControl, Input, InputLabel, Button } from "@mui/material"
import { buttonStyle } from "../components/styles"
import { collection, setDoc, addDoc, doc } from "firebase/firestore"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import { Box } from "@mui/system"
import { getAuth } from "firebase/auth"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-toastify"
import { db } from "../firebase.config"

const NewPostForm = () => {
  const [formData, setFormData] = useState({
    caption: "",
    images: {},
  })
  const docID = uuidv4()

  const { caption, images } = formData
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
        docID,
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

      if (images) {
        const imgURLS = await Promise.all(
          [...images].map((image) => storeImage(image))
        )
          .then(addDoc(collection(db, "posts"), newPost))
          .catch(() => {
            toast.error("image not uploaded")
            return
          })
        newPost = { ...newPost, imgURLS }
        await setDoc(doc(db, "posts", docID), newPost)
      }

      toast.success("Your post is uploaded")
      return () => document.querySelector(".form").reset()
    } catch (error) {
      toast.error("Post not uploaded")
    }
  }

  return (
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
        <InputLabel htmlFor="caption">Share something cool:</InputLabel>
        <Input
          sx={{ width: 1 }}
          type="caption"
          id="caption"
          name="caption"
          autoComplete="off"
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
  )
}

export default NewPostForm
