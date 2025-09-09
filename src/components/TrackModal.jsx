import React from "react";
import VerticalTracker from "./VerticalTracker";

export default function TrackModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        {/* Order details */}
        <h2 className="text-2xl font-bold text-blue-600 mb-2">
          Tracking Order #{order.id}
        </h2>
        <p className="text-sm text-gray-500 mb-6">Placed on {order.date}</p>

        {/* Vertical tracker */}
        <VerticalTracker status={order.status} />
      </div>
    </div>
  );
}

