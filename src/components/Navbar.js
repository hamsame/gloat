import React from "react"
import { Box } from "@mui/material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import Person2Icon from "@mui/icons-material/Person2"
import { grey } from "@mui/material/colors"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  const color = grey[900]
  const activeColor = grey[600]

  const pathSameAsRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <Box sx={{ width: 1, color: "black" }}>
      <BottomNavigation>
        <Link to="/">
          <BottomNavigationAction
            label="Homepage"
            icon={
              <HomeIcon
                sx={pathSameAsRoute("/") ? { color } : { color: activeColor }}
              />
            }
          />
        </Link>
        <Link to="/profile">
          <BottomNavigationAction
            label="Profile page"
            icon={
              <Person2Icon
                sx={
                  pathSameAsRoute("/profile")
                    ? { color }
                    : { color: activeColor }
                }
              />
            }
          />
        </Link>
      </BottomNavigation>
    </Box>
  )
}

export default Navbar
