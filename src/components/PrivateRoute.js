import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useCheckAuth } from "../hooks/useCheckAuth"

const PrivateRoute = () => {
  const { loggedIn, checking } = useCheckAuth()

  if (checking) {
    return <h1>loading</h1>
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
