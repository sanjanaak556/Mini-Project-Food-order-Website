import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggleIcon from "./ThemeToggleIcon";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // Toggle state for mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // All navbars are transparent
  const navBg = "bg-transparent";

  // Text color logic
  const isLandingPage = path === "/";
  const isCustomerHome = path === "/customer";

  const linkColor =
    isLandingPage || isCustomerHome ? "text-white" : "text-black";

  // Links (common for reuse)
  const customerLinks = (
    <>
      <Link
        to="/customer"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/customer/orders"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        My Orders
      </Link>
      <Link
        to="/customer/cart"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Cart
      </Link>
      <Link
        to="/customer/wishlist"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Wishlist
      </Link>
      <Link
        to="/"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Logout
      </Link>
    </>
  );

  const landingLinks = (
    <>
      <Link
        to="/"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <a
        href="#about"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        About
      </a>
      <a
        href="#contact"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Contact
      </a>
      <Link
        to="/login"
        className={`${linkColor} font-semibold hover:text-red-400 px-3`}
        onClick={() => setIsOpen(false)}
      >
        Login
      </Link>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 ${navBg}`}
      style={{ backgroundColor: "transparent" }}
    >
      {/* Logo */}
      <div className="flex gap-3 items-center">
        <img
          src="/images/H-logo.jpg"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className={`text-2xl font-bold ${linkColor}`}>HungerHub</h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4 items-center">
        {path.startsWith("/customer") ? customerLinks : landingLinks}
        <ThemeToggleIcon />
      </div>

      {/* Mobile Toggle Icon */}
      <div className="md:hidden">
        {isOpen ? (
          <FaTimes
            className={`${linkColor} text-2xl cursor-pointer`}
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <FaBars
            className={`${linkColor} text-2xl cursor-pointer`}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-sm md:hidden flex flex-col items-center py-4 space-y-4">
          {path.startsWith("/customer") ? customerLinks : landingLinks}
          <ThemeToggleIcon />
        </div>
      )}
    </nav>
  );
}

export default Navbar;



