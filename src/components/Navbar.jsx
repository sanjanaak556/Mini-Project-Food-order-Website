// Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggleIcon from "./ThemeToggleIcon";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // All navbars are transparent
  const navBg = "bg-transparent";

  // Text color logic
  const isLandingPage = path === "/";
  const isCustomerHome = path === "/customer";

  const linkColor =
    isLandingPage || isCustomerHome ? "text-white" : "text-black";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 ${navBg} `}
      style={{ backgroundColor: "transparent" }}>
      {/* Logo */}
      <div className="flex gap-3 items-center">
        <img src="/images/H-logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className={`text-2xl font-bold ${linkColor}`}>HungerHub</h1>
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {path.startsWith("/customer") ? (
          <>
            <Link to="/customer" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>
              Home
            </Link>
            <Link to="/customer/orders" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>
              My Orders
            </Link>
            <Link to="/customer/cart" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>
              Cart
            </Link>
            <Link to="/customer/wishlist" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>
              Wishlist
            </Link>
            <Link to="/" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>Home</Link>
            <a href="#about" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>About</a>
            <a href="#contact" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>Contact</a>
            <Link to="/login" className={`${linkColor} font-semibold hover:text-red-400 px-3`}>Login</Link>
          </>
        )}
        <ThemeToggleIcon />
      </div>
    </nav>
  );
}

export default Navbar;


