import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((i) => i.id === item.id);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    alert(`${item.name} added to cart 🛒`);
  };

  const toggleWishlist = () => {
    if (isWishlisted) dispatch(removeFromWishlist(item.id));
    else dispatch(addToWishlist(item));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Image + Badges */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
        {item.veg ? (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Veg
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Non-Veg
          </span>
        )}
        {item.bestSeller && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Best Seller
          </span>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={toggleWishlist}
          className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow hover:bg-pink-100 transition"
        >
          <FaHeart className={`text-red-500 ${!isWishlisted ? "opacity-50" : "opacity-100"}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-500 capitalize">{item.restaurant}</p>
        <p className="text-red-500 font-bold">₹{item.price}</p>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 mb-2">
          <FaStar className="mr-1" />
          <span>{item.rating}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 text-white text-sm py-1 rounded hover:bg-green-600 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate(`/customer/product/${item.id}`)}
            className="flex-1 bg-blue-500 text-white text-sm py-1 rounded hover:bg-blue-600 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;


