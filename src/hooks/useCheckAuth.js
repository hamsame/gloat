import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useCheckAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setChecking(false)
    })
    return unsub
  })

  return { loggedIn, checking }
}
