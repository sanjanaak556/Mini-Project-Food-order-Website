import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/WishlistSlice";
import { addToCart } from "../../redux/CartSlice";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

function Wishlist() {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const handleMoveToCart = (item) => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id));
        alert(`${item.name} moved to cart 🛒`);
    };

    return (
        <div className="p-6 min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-9.jpg')" }}>
            <h1 className="text-2xl text-center mt-10 mb-6 font-bold text-red-500">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
