import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { addToCart } from '../../redux/CartSlice'

function CustomerHome() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [addedItem, setAddedItem] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("https://sanjanaak556.github.io/Food-API/data.json")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
                setLoading(false)
            })
    }, [])

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        setAddedItem(item)
        setModalOpen(true)

        // Auto-close modal after 2 seconds
        setTimeout(() => {
            setModalOpen(false)
        }, 2000)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">
                🍔 Our Menu
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition">
                        {/* Product Image */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-cover mb-4 rounded-lg" />

                        {/* Product Info */}
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600 mb-2">₹{item.price}</p>

                        {/* View Details (URL param) */}
                        <Link
                            to={`/customer/product/${item.id}`}
                            className="text-blue-500 underline mb-2">
                            View Details
                        </Link>

                        {/* Add to Cart */}
                        <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && addedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 animate-fade-in">
                        <h3 className="text-lg font-bold text-green-600 mb-2">
                            ✅ Item Added!
                        </h3>
                        <p className="text-gray-700">
                            {addedItem.name} has been added to your cart.
                        </p>

                        <div className="flex justify-center gap-3">
                            {/* Close Button */}
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                            >
                                Close
                            </button>

                            {/* Go to Cart Button */}
                            <Link
                                to="/customer/cart"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Go to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}



export default CustomerHome
