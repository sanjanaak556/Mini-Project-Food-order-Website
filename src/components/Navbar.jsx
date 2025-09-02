import React from "react"
import { Link, useLocation } from "react-router-dom"
import LogOutButton from "./LogOutButton"

function Navbar() {
  const location = useLocation()

  // for determining current path
  const path = location.pathname

  // Conditional rendering of navbar items
  let navItems

  if (path === "/") {
    // Landing Page Navbar
    navItems = (
      <>
        <Link to="/" className="text-white font-semibold hover:text-red-600 px-3">
          Home
        </Link>
        <a href="#about" className="text-white font-semibold hover:text-red-600 px-3">
          About
        </a>
        <a href="#contact" className="text-white font-semibold hover:text-red-600 px-3">
          Contact
        </a>
        <Link to="/login" className="text-white font-semibold hover:text-red-600 px-3">
          Login
        </Link>
      </>
    )
  } else if (path.startsWith("/customer")) {
    // Customer Layout Navbar
    navItems = (
      <>
      <Link to="/customer" className="text-black font-semibold hover:text-red-600 px-3">
          Menu
        </Link>
        <Link to="/customer/orders" className="text-black font-semibold hover:text-red-600 px-3">
          My Orders
        </Link>
        <Link to="/customer/cart" className="text-black font-semibold hover:text-red-600 px-3">
          Cart
        </Link>
        <Link to="/customer/profile" className="text-black font-semibold hover:text-red-600 px-3">
          Profile
        </Link>
        <LogOutButton />
      </>
    )
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 absolute top-0 w-full z-50">
      {/* Logo + Website Name */}
      <div className="flex gap-3 items-center">
        <img src="/images/H-logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-2xl font-bold text-red-500">HungerHub</h1>
      </div>
      {/* Render menu items */}
      <div className="flex gap-4">{navItems}</div>
    </nav>
  )
}

export default Navbar

