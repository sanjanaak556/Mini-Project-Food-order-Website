// src/pages/customer/Checkout.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addOrder, updateOrderStatus } from "../../redux/OrdersSlice";
import { clearCart, removeFromCart } from "../../redux/CartSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux cart as fallback
  const reduxCart = useSelector((state) => state.cart.cart || []);

  // Read state passed when navigating from cart (Cart.jsx passes state)
  const {
    items: stateItems = null,
    deliveryCharge: stateDelivery = null,
    packingCharge: statePacking = null,
    singleItem = null,
  } = location.state || {};

  // Determine which items to checkout:
  // 1) singleItem (Place Order from single card)
  // 2) stateItems (Place All from cart modal or passed from Cart)
  // 3) reduxCart fallback
  const itemsToCheckout = singleItem
    ? [{ ...singleItem, quantity: singleItem.quantity || 1 }]
    : stateItems && stateItems.length
    ? stateItems.map((it) => ({ ...it, quantity: it.quantity || 1 }))
    : reduxCart.map((it) => ({ ...it, quantity: it.quantity || 1 }));

  // Charges: use passed values if provided, else defaults
  const deliveryCharge = typeof stateDelivery === "number" ? stateDelivery : 40;
  const packingCharge = typeof statePacking === "number" ? statePacking : 20;

  // Totals
  const subtotal = itemsToCheckout.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const grandTotal = subtotal + deliveryCharge + packingCharge;

  // Payment + UI state
  const [payment, setPayment] = useState("card");
  const [showConfirm, setShowConfirm] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handlePlaceOrder = () => {
    if (!itemsToCheckout || itemsToCheckout.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const newOrder = {
      id: `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
      date: new Date().toLocaleString(),
      items: itemsToCheckout,
      subtotal,
      deliveryCharge,
      packingCharge,
      total: grandTotal,
      payment,
      status: "Order Placed",
    };

    // Save to Redux and localStorage
    dispatch(addOrder(newOrder));
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...storedOrders, newOrder]));

    // Update cart depending on what was ordered:
    // - If singleItem: remove only that item from cart
    // - If items came from stateItems (assume "Place All"): clear cart
    // - If fallback to reduxCart (user came direct to checkout), clear cart after placing
    if (singleItem) {
      dispatch(removeFromCart(singleItem.id));
      // sync localStorage cart
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = currentCart.filter((c) => c.id !== singleItem.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Clear whole cart
      dispatch(clearCart());
      localStorage.setItem("cart", JSON.stringify([]));
    }

    setPlacedOrder(newOrder);
    setShowConfirm(true);

    // Demo status updates
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

      {/* Items list */}
      {itemsToCheckout.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
            <ul className="space-y-2">
              {itemsToCheckout.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b pb-2 text-gray-700"
                >
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <span>₹{item.price * (item.quantity || 1)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 text-right">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Delivery Charge: ₹{deliveryCharge}</p>
              <p>Packing Charge: ₹{packingCharge}</p>
              <p className="text-xl font-bold">Total: ₹{grandTotal}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Card Payment
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={payment === "upi"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handlePlaceOrder}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Pay Now
            </button>

            <button
              onClick={() => {
                // go back: if user came from cart, go back to cart; otherwise go to customer home
                const cameFromCart = !!stateItems || !!singleItem;
                navigate(cameFromCart ? "/customer/cart" : "/customer");
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
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

            <button
              onClick={() => navigate("/customer/orders")}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Go to My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




