import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/WishlistSlice";
import { addToCart } from "../../redux/CartSlice";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistFromState = useSelector((state) => state.wishlist.items || []);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from Redux or localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist.length ? storedWishlist : wishlistFromState);
  }, [wishlistFromState]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: item.quantity || 1 }));
    dispatch(removeFromWishlist(item.id));

    // Update localStorage immediately
    const updatedWishlist = wishlistItems.filter((i) => i.id !== item.id);
    setWishlistItems(updatedWishlist);

    alert(`${item.name} moved to cart 🛒`);
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
    const updatedWishlist = wishlistItems.filter((i) => i.id !== itemId);
    setWishlistItems(updatedWishlist);
  };

  return (
    <div
      className="p-6 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-9.jpg')" }}
    >
      <h1 className="text-2xl text-center mt-18 mb-6 font-bold text-red-500">
        My Wishlist ❤️
      </h1>

      {/* Back button */}
      <Link to="/customer">
        <button className="mt-4 mb-4 text-white bg-green-500 hover:bg-green-600 rounded-md p-2">
          ← Back to Menu
        </button>
      </Link>

      {wishlistItems.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard item={item} />
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;


