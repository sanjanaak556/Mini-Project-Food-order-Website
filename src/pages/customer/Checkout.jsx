import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addOrder, updateOrderStatus } from "../../redux/OrdersSlice";
import { clearCart } from "../../redux/CartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartFromState = location.state?.items || [];
  const singleItem = location.state?.singleItem || null;
  const deliveryCharge = location.state?.deliveryCharge || 40;
  const packingCharge = location.state?.packingCharge || 20;

  const cart = singleItem ? [singleItem] : cartFromState;

  const [payment, setPayment] = useState("card");
  const [showConfirm, setShowConfirm] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const itemsTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const finalTotal = itemsTotal + deliveryCharge + packingCharge;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const newOrder = {
      id: uuidv4().slice(0, 8).toUpperCase(),
      date: new Date().toLocaleString(),
      items: cart,
      itemsTotal,
      deliveryCharge,
      packingCharge,
      total: finalTotal,
      payment,
      status: "Order Placed",
    };

    // Save to Redux
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    setPlacedOrder(newOrder);
    setShowConfirm(true);

    // 🚚 Auto update tracking status (demo)
    setTimeout(() => {
      dispatch(updateOrderStatus({ id: newOrder.id, status: "Prepared" }));
    }, 3000);

    setTimeout(() => {
      dispatch(updateOrderStatus({ id: newOrder.id, status: "Out for Delivery" }));
    }, 6000);

    setTimeout(() => {
      dispatch(updateOrderStatus({ id: newOrder.id, status: "Delivered" }));
    }, 9000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
            <ul className="space-y-2">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b pb-2 text-gray-700">
                  <span>{item.name} × {item.quantity || 1}</span>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                </li>
              ))}
            </ul>
            <p className="flex justify-between font-semibold mt-3">
              <span>Items Total:</span> <span>₹{itemsTotal}</span>
            </p>
            <p className="flex justify-between font-semibold">
              <span>Delivery Charge:</span> <span>₹{deliveryCharge}</span>
            </p>
            <p className="flex justify-between font-semibold">
              <span>Packing Charge:</span> <span>₹{packingCharge}</span>
            </p>
            <p className="text-right font-bold mt-3">Total: ₹{finalTotal}</p>
          </div>

          {/* Payment method */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="card" checked={payment === "card"} onChange={(e) => setPayment(e.target.value)} />
                Card Payment
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="upi" checked={payment === "upi"} onChange={(e) => setPayment(e.target.value)} />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={(e) => setPayment(e.target.value)} />
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button onClick={handlePlaceOrder} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Pay Now
            </button>
            <button onClick={() => navigate("/customer/cart")} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Confirmation modal */}
      {showConfirm && placedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => {
                setShowConfirm(false);
                navigate("/customer/orders");
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Order Confirmed!</h2>
            <p className="mb-2">Order #{placedOrder.id}</p>
            <p className="mb-2">Total: ₹{placedOrder.total}</p>
            <p className="mb-2">Payment: {placedOrder.payment.toUpperCase()}</p>

            <button onClick={() => navigate("/customer/orders")} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Go to My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


