import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { addToCart } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";  

function DiscountDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/data/offersDiscounts.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((p) => p.id === parseInt(id));

                if (found) {
                    // 🔑 Normalize the product before storing in state
                    setProduct({
                        ...found,
                        price: Number(found.discountPrice || found.offerPrice || found.originalPrice) || 0,
                        quantity: 1, // ensure consistent field
                    });
                }
            });
    }, [id]);

    if (!product) return <p className="text-center p-6">Loading...</p>;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert(`${product.name} added to cart! 🛒`);
        navigate("/customer/cart");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Back button */}
            <div className="max-w-3xl mx-auto p-6 mt-10">
                <Link to="/customer">
                    <button className="mt-6 mb-6 text-white bg-green-500 hover:bg-green-600 rounded-md p-2">
                        Go back to menu
                    </button>
                </Link>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                    />

                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h2>
                        <p className="text-gray-600 mb-3">{product.description}</p>
                        <p className="text-red-500 font-semibold mb-2">
                            {product.typeOfDiscount} ({product.discountInterval})
                        </p>
                        <p className="text-gray-700 line-through">
                            Original Price: ₹{product.originalPrice}
                        </p>
                        <p className="text-green-600 font-bold text-lg">
                            Discount Price: ₹{product.discountPrice}
                        </p>

                        <button
                            onClick={handleAddToCart}
                            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscountDetails;


