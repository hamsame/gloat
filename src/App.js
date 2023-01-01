import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
import Navbar from "./components/Navbar"
import Home from "../src/pages/Home"
import Profile from "./pages/Profile"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  )
}

export default App
