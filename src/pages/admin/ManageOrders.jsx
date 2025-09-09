import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaTrashAlt, FaTruck, FaExchangeAlt } from "react-icons/fa";

const STATUS_STEPS = [
  "Order Placed",
  "Pending",
  "Prepared",
  "Out for Delivery",
  "Delivered",
];

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [showReassign, setShowReassign] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newSeller, setNewSeller] = useState("");
  const [reassignReason, setReassignReason] = useState("");

  const navigate = useNavigate();

  // Load orders from API
  useEffect(() => {
    fetch("https://sanjanaak556.github.io/API-Seller-Orders/Sellers.json")
      .then((res) => res.json())
      .then((data) => {
        const withStatus = data.map((o) => ({
          ...o,
          status: o.status || "Order Placed", // use API status if available
          disabled: o.status === "Cancelled", // disable if cancelled
          reassignedSeller: null, // store reassigned seller separately
          reassignReason: null,
        }));
        setOrders(withStatus);
      });
  }, []);

  // Auto-progress each order individually (only up to its API status)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.status === "Cancelled" || o.status === "Delivered") return o;

          const targetIdx = STATUS_STEPS.indexOf(o.apiStatus || o.status);
          const currentIdx = STATUS_STEPS.indexOf(o.status);

          if (currentIdx < targetIdx) {
            return { ...o, status: STATUS_STEPS[currentIdx + 1] };
          }
          return o;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function handleCancel(order) {
    if (!window.confirm("Cancel this order?")) return;
    const updated = orders.map((o) =>
      o.id === order.id ? { ...o, status: "Cancelled", disabled: true } : o
    );
    setOrders(updated);
    window.alert("Order cancelled successfully.");
  }

  function handleTrack(order) {
    navigate(`/admin/orders/${order.id}`, { state: { order } });
  }

  function handleReassign(order) {
    setSelectedOrder(order);
    setNewSeller("");
    setReassignReason("");
    setShowReassign(true);
  }

  function saveReassign() {
    if (!newSeller.trim() || !reassignReason.trim()) {
      window.alert("Please enter both new seller and reason.");
      return;
    }

    const updated = orders.map((o) =>
      o.id === selectedOrder.id
        ? {
            ...o,
            reassignedSeller: newSeller,
            reassignReason: reassignReason,
          }
        : o
    );

    setOrders(updated);
    setShowReassign(false);
    window.alert("Order reassigned successfully.");
  }

  return (
    <div className="p-6 md:ml-64">
      <div className="flex items-center mb-6 space-x-3">
        <FaClipboardList className="text-2xl text-blue-600" />
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-4 border rounded-lg shadow ${
              order.disabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <img
              src={order.imageUrl}
              alt={order.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="font-bold text-lg mb-1">{order.name}</h2>
            <p className="text-sm text-gray-600 mb-1">Category: {order.category}</p>
            <p className="text-sm text-gray-600 mb-1">
              Restaurant: {order.restaurant}
            </p>
            {order.reassignedSeller && (
              <p className="text-sm text-indigo-600 mb-1">
                ➝ Reassigned To: {order.reassignedSeller}
              </p>
            )}
            <p className="text-sm text-gray-600 mb-1">Address: {order.address}</p>
            <p className="text-sm text-gray-600 mb-1">Qty: {order.quantity}</p>
            <p className="text-sm text-gray-600 mb-1">Price: ₹{order.price}</p>
            <p className="text-sm text-gray-600 mb-1">Payment: {order.paymentMode}</p>
            <p className="text-sm text-gray-600 mb-2">Delivery: {order.deliveryTime}</p>
            <p className="text-sm font-semibold mb-2">
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

            <div className="flex flex-wrap justify-between gap-2 mt-2">
              <button
                onClick={() => handleCancel(order)}
                className="flex items-center space-x-1 text-red-500"
              >
                <FaTrashAlt /> <span>Cancel</span>
              </button>
              <button
                onClick={() => handleTrack(order)}
                className="flex items-center space-x-1 text-green-600"
              >
                <FaTruck /> <span>Track</span>
              </button>
              <button
                onClick={() => handleReassign(order)}
                className="flex items-center space-x-1 text-indigo-600"
              >
                <FaExchangeAlt /> <span>Reassign</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showReassign && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-2">
              Reassign Order #{selectedOrder.id}
            </h2>

            {/* New Seller Field */}
            <input
              type="text"
              value={newSeller}
              onChange={(e) => setNewSeller(e.target.value)}
              className="w-full border rounded p-2 mb-3"
              placeholder="Enter new seller/restaurant name"
            />

            {/* Reason Field */}
            <textarea
              value={reassignReason}
              onChange={(e) => setReassignReason(e.target.value)}
              className="w-full border rounded p-2 h-28 mb-3"
              placeholder="Enter reason for reassignment"
            ></textarea>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowReassign(false)}
                className="px-3 py-1 rounded bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveReassign}
                className="px-3 py-1 rounded bg-indigo-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;


