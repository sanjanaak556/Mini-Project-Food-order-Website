import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/WishlistSlice";
import { FaArrowLeft, FaHeart, FaStar } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://sanjanaak556.github.io/Menu-API/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  const handleWishlist = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id));
      setInWishlist(false);
    } else {
      dispatch(addToWishlist(product));
      setInWishlist(true);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));    
    alert(`${product.name} added to cart! 🛒`);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-red-500 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Product Card Layout */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-500">{product.restaurant}</p>
          <p className="text-red-500 text-xl font-bold mt-2">₹{product.price}</p>

          {/* Rating */}
          <div className="flex items-center text-yellow-500 mt-2">
            <FaStar className="mr-1" />
            <span>{product.rating}</span>
          </div>

          {/* Veg / Best Seller Tags */}
          <div className="flex gap-2 mt-3">
            {product.veg ? (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Veg</span>
            ) : (
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">Non-Veg</span>
            )}
            {product.bestSeller && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Best Seller</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-4">{product.description}</p>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`flex items-center justify-center px-4 py-2 rounded ${
                inWishlist ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <FaHeart className={inWishlist ? "text-white" : "text-red-500"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;



