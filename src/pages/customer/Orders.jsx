import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../../redux/OrdersSlice";
import { Link, useNavigate } from "react-router-dom";
import TrackModal from "../../components/TrackModal"
import { FaRedo, FaTimesCircle, FaTruck } from "react-icons/fa";
import { addToCart } from "../../redux/CartSlice";
import OrderCard from "../../components/OrderCard";

export default function Orders() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trackOrder, setTrackOrder] = useState(null);

  // ✅ Reorder: add items back to cart and go to checkout
  const handleReorder = (order) => {
    order.items.forEach((it) =>
      dispatch(addToCart({ ...it, quantity: it.quantity || 1 }))
    );
    navigate("/customer/checkout");
  };

  // ✅ Cancel order (only if not delivered/cancelled)
  const handleCancel = (id, status) => {
    if (status === "Delivered" || status === "Cancelled") {
      alert("❌ Cannot cancel this order.");
      return;
    }
    if (window.confirm("Do you want to cancel this order?")) {
      dispatch(cancelOrder(id));
      alert("✅ Order cancelled.");
    }
  };

  // ✅ Open track modal
  const handleTrack = (order) => setTrackOrder(order);

  return (
    <div className="p-6 mx-auto min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-9.jpg')" }} >
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6 mt-10">
        📦 My Orders
      </h2>
      <Link to="/customer">
        <button className="mt-4 mb-4 text-white bg-green-500 hover:bg-green-600 rounded-md p-2"> ← Back to Menu</button>
      </Link>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-20">No orders yet!</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              {/* ✅ OrderCard displays items, total, payment, status */}
              <div className="flex-1">
                <OrderCard
                  order={{
                    ...order,
                    // ✅ Format order ID: ORD-XXXXXX
                    id: order.id.startsWith("ORD-")
                      ? order.id
                      : `ORD-${order.id.toUpperCase()}`,
                  }}
                />
              </div>

              {/* ✅ Action buttons */}
              <div className="mt-4 md:mt-0 flex gap-2 flex-wrap">
                <button
                  onClick={() => handleReorder(order)}
                  className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-50"
                >
                  <FaRedo /> Reorder
                </button>

                <button
                  onClick={() => handleCancel(order.id, order.status)}
                  disabled={order.status === "Cancelled"}
                  className={`flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-50 ${order.status === "Cancelled"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                >
                  <FaTimesCircle /> Cancel
                </button>

                <button
                  onClick={() => handleTrack(order)}
                  className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-50"
                >
                  <FaTruck /> Track
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Track modal */}
      {trackOrder && (
        <TrackModal order={trackOrder} onClose={() => setTrackOrder(null)} />
      )}
    </div>

  );
}


