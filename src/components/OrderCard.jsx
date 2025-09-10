import React from "react";

export default function OrderCard({ order }) {
  if (!order || !order.items) return null;

  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
      {/* Order Header */}
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-lg">
          Order ID: {order.id || "N/A"}
        </h3>
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${order.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {order.status || "Pending"}
        </span>
      </div>

      {/* Items List */}
      <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-1 text-gray-700"
          >
            <span className="font-medium">
              {item.name || "Unnamed Item"} × {item.quantity || 1}
            </span>
            <span>₹{item.price ? item.price * (item.quantity || 1) : 0}</span>
          </div>
        ))}
      </div>

      {/* Payment & Total */}
      <div className="flex justify-between mt-2 text-gray-800 font-semibold">
        <span>Payment:</span>
        <span>{order.payment?.toUpperCase() || "N/A"}</span>
      </div>
      <div className="flex justify-between mt-1 text-gray-800 font-bold">
        <span>Total:</span>
        <span>₹{order.total || 0}</span>
      </div>
    </div>
  );
}





