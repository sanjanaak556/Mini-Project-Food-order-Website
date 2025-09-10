import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import VerticalTracker from "../../components/VerticalTracker";
import { FaClipboardList } from "react-icons/fa";

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  // Load order if not passed via state
  useEffect(() => {
    if (!order) {
      fetch("https://sanjanaak556.github.io/API-Seller-Orders/Sellers.json")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((o) => String(o.id) === id);
          if (found) setOrder(found); // use status from API
        });
    }
  }, [id, order]);

  if (!order) {
    return (
      <div className="p-6">
        <p className="text-red-500">Order not found.</p>
        <button
          onClick={() => navigate("/admin/orders")}
          className="mt-4 px-3 py-1 rounded bg-blue-600 text-white"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 ml-64">
      <button
        onClick={() => navigate("/admin/orders")}
        className="mb-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        <FaClipboardList className="text-lg" />
        <span>Go Back to Orders</span>
      </button>


      <div
        className={`bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto ${order.status === "Cancelled" ? "opacity-70 pointer-events-none" : ""
          }`}
      >
        <img
          src={order.imageUrl}
          alt={order.name}
          className="w-full h-48 object-cover rounded mb-3"
        />
        <h2 className="text-xl font-bold mb-1">{order.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Category: {order.category}</p>
        <p className="text-sm text-gray-600 mb-1">Restaurant: {order.restaurant}</p>
        <p className="text-sm text-gray-600 mb-1">Address: {order.address}</p>
        <p className="text-sm text-gray-600 mb-1">Qty: {order.quantity}</p>
        <p className="text-sm text-gray-600 mb-1">Price: ₹{order.price}</p>
        <p className="text-sm text-gray-600 mb-1">Payment: {order.paymentMode}</p>
        <p className="text-sm text-gray-600 mb-2">Delivery: {order.deliveryTime}</p>
        <p className="text-sm font-semibold mb-4">
          Status:{" "}
          <span
            className={
              order.status === "Cancelled"
                ? "text-red-600"
                : order.status === "Delivered"
                  ? "text-green-600"
                  : "text-blue-600"
            }
          >
            {order.status}
          </span>
        </p>

        {order.status === "Cancelled" ? (
          <div className="text-center text-red-600 font-semibold text-lg">
            This order has been cancelled
          </div>
        ) : (
          <VerticalTracker status={order.status} />
        )}
      </div>
    </div>
  );
}



