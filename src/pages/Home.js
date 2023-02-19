import React, { useState, useEffect, useRef } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"

import { containerStyle } from "../components/styles"
import { Container } from "@mui/system"
import { toast } from "react-toastify"
import Posts from "../components/Posts"
import NewPostForm from "../components/NewPostForm"

function Home() {
  const isMounted = useRef(true)
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    let fetchedPosts = []
    try {
      const allPosts = await getDocs(collection(db, "posts"))
      console.log(allPosts)
      allPosts.forEach((doc) => {
        fetchedPosts = [...fetchedPosts, doc.data()]
      })
      setPosts(fetchedPosts)
      console.log(fetchedPosts)
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
      <NewPostForm />

      <Posts posts={posts} />
    </Container>
  )
}

export default Home
