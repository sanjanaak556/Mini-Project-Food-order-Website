import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper: check active path
  const isActive = (path) =>
    location.pathname === path
      ? "bg-red-500 text-white shadow-md"
      : "text-black hover:bg-gray-100 hover:text-red-600";

  const sellerLinks = [
    { path: "/seller", label: "Dashboard" },
    { path: "/seller/menu", label: "Menu" },
    { path: "/seller/orders", label: "Orders" },
    { path: "/seller/discounts", label: "Discounts" },
    { path: "/seller/offers", label: "Offers" },
    { path: "/seller/reviews", label: "Reviews" },
    { path: "/seller/notifications", label: "Notifications" },
  ];

  const adminLinks = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/customers", label: "Customers" },
    { path: "/admin/sellers", label: "Sellers" },
    { path: "/admin/menu", label: "Menu" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/reports", label: "Reports" },
    { path: "/admin/notifications", label: "Notifications" },
    { path: "/admin/reviews", label: "Reviews" },
  ];

  const links = location.pathname.startsWith("/seller")
    ? sellerLinks
    : adminLinks;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-42 z-50 bg-red-500 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl rounded-r-2xl p-6 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-2xl font-bold mb-8">
          {location.pathname.startsWith("/seller") ? "Seller" : "Admin"}
        </h2>

        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg font-semibold transition ${isActive(
                link.path
              )}`}
              onClick={() => setIsOpen(false)} // close on mobile
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
