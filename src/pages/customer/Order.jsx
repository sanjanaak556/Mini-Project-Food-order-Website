import React from "react";
import { useSelector } from "react-redux";

function Order() {
  const orders = useSelector((state) => state.cart.orders);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-500 text-center mt-10 mb-6">
        📦 My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-20">No orders yet!</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow p-6 rounded-lg border"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>

              <ul className="list-disc list-inside mb-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ₹{item.price}
                  </li>
                ))}
              </ul>

              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              {/* <p>
                <strong>Payment:</strong> {order.payment.toUpperCase()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600">{order.status}</span>
              </p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
