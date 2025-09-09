import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
    const cartItems = useSelector((state) => state.cart.cart || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // Extra charges
    const deliveryCharge = 40;
    const packingCharge = 20;

    // Totals
    const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const finalTotal = itemsTotal + deliveryCharge + packingCharge;

    return (
        <div className="p-6 mx-auto min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-9.jpg')" }}>
            <h1 className="text-2xl mt-10 text-center text-green-500 font-bold mb-6">🛒 My Cart</h1>
            <Link to="/customer">
                <button className="mt-4 mb-4 text-white bg-green-500 hover:bg-green-600 rounded-md px-4 py-2">
                    ← Back to Menu
                </button>
            </Link>

            {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-gray-600">₹{item.price}</p>
                                    </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => dispatch(decreaseQuantity(item.id))}
                                        className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(increaseQuantity(item.id))}
                                        className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => {
                                            setModalType("single");
                                            setSelectedItem(item);
                                            setShowModal(true);
                                        }}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Place Order
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-20">
                        <h3 className="text-xl font-bold mb-4">Checkout Summary</h3>
                        <p className="flex justify-between text-gray-700 mb-2">
                            <span>Items Total:</span> <span>₹{itemsTotal}</span>
                        </p>
                        <p className="flex justify-between text-gray-700 mb-2">
                            <span>Delivery Charge:</span> <span>₹{deliveryCharge}</span>
                        </p>
                        <p className="flex justify-between text-gray-700 mb-2">
                            <span>Packing Charge:</span> <span>₹{packingCharge}</span>
                        </p>
                        <hr className="my-2" />
                        <p className="flex justify-between font-bold text-lg">
                            <span>Total:</span> <span>₹{finalTotal}</span>
                        </p>

                        <button
                            onClick={() => {
                                setModalType("all");
                                setShowModal(true);
                            }}
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition mt-4"
                        >
                            Place All Orders
                        </button>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        {modalType === "all" ? (
                            <div>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between border-b pb-1 text-sm">
                                            <span>{item.name} × {item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 space-y-1 text-sm">
                                    <p className="flex justify-between"><span>Items Total:</span> <span>₹{itemsTotal}</span></p>
                                    <p className="flex justify-between"><span>Delivery Charge:</span> <span>₹{deliveryCharge}</span></p>
                                    <p className="flex justify-between"><span>Packing Charge:</span> <span>₹{packingCharge}</span></p>
                                    <hr />
                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-bold">Total: ₹{finalTotal}</p>
                                        <button
                                            onClick={() => navigate("/customer/checkout")}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            selectedItem && (
                                <>
                                    <div className="space-y-2">
                                        <p><strong>{selectedItem.name}</strong> × {selectedItem.quantity}</p>
                                        <p>Item Total: <span className="font-bold">₹{selectedItem.price * selectedItem.quantity}</span></p>
                                    </div>
                                    <div className="mt-4 space-y-1 text-sm">
                                        <p className="flex justify-between"><span>Delivery Charge:</span> <span>₹{deliveryCharge}</span></p>
                                        <p className="flex justify-between"><span>Packing Charge:</span> <span>₹{packingCharge}</span></p>
                                        <hr />
                                        <div className="flex justify-between items-center">
                                            <p className="text-xl font-bold">
                                                Total: ₹{selectedItem.price * selectedItem.quantity + deliveryCharge + packingCharge}
                                            </p>
                                            <button
                                                onClick={() => navigate("/customer/checkout")}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            >
                                                Proceed to Checkout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        )}

                        {/* Cancel button */}
                        <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 rounded-lg border hover:bg-gray-100">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;


