import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const wishlistFromState = useSelector((state) => state.wishlist.items || []);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist.length ? storedWishlist : wishlistFromState);
  }, [wishlistFromState]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="p-6 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-9.jpg')" }}>
      <h1 className="text-2xl text-center mt-18 mb-6 font-bold text-red-500">My Wishlist ❤️</h1>

      <Link to="/customer">
        <button className="mt-4 mb-4 text-white bg-green-500 hover:bg-green-600 rounded-md p-2">
          ← Back to Menu
        </button>
      </Link>

      {wishlist.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



