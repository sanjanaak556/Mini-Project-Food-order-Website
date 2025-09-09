import React from "react";

export default function OrderCard({ order }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
      {/* Top row: ID + date */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-800">
          Order #{order.id}
        </h3>
        <span className="text-sm text-gray-500">{order.date}</span>
      </div>

      {/* Items list */}
      <ul className="list-disc list-inside text-gray-700 mb-3">
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.name} * {item.quantity || 1} — ₹{item.price}
          </li>
        ))}
      </ul>

      {/* Total + Payment + Status */}
      <div className="space-y-1">
        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>
        <p>
          <strong>Payment:</strong>{" "}
          {order.payment ? order.payment.toUpperCase() : "N/A"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-sm font-semibold
              ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {order.status}
          </span>
        </p>
      </div>
    </div>
  );
}

