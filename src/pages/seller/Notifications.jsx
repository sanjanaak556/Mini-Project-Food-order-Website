import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder, rejectOrder } from "../../redux/OrdersSlice";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sanjanaak556.github.io/API-Seller-Orders/Sellers.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Fetch system messages fresh every time (no localStorage persistence)
  useEffect(() => {
    fetch("/data/notifications.json")
      .then((res) => res.json())
      .then((data) => {
        const unreadMessages = data.map((msg) => ({
          ...msg,
          read: false,
        }));
        setMessages(unreadMessages);
      })
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  // Accept order → moves to New filter & store in Redux/localStorage
  const handleAccept = (order) => {
    dispatch(addOrder({ ...order, status: "New" }));
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
    alert(`Order #${order.id} accepted ✅`);
  };

  // Reject order → moves to Rejected filter & store in Redux/localStorage
  const handleReject = (order) => {
    dispatch(rejectOrder(order));
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
    alert(`Order #${order.id} rejected ❌`);
  };

  // Mark message read → auto-remove after 2s
  const markAsRead = (id) => {
    const updated = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updated);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto ml-64">
      <h1 className="text-2xl font-bold mb-6 text-center">Notifications</h1>

      {/* Orders Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No new orders.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="p-4 border rounded-lg shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                {/* Order Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={order.imageUrl}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{order.name}</p>
                    <p className="text-sm text-gray-600">
                      Category: {order.category}
                    </p>
                    <p className="text-sm">Qty: {order.quantity}</p>
                    <p className="text-sm">₹{order.price}</p>
                    <p className="text-sm">Address: {order.address}</p>
                    <p className="text-sm">Delivery: {order.deliveryTime}</p>
                    <p className="text-sm">Payment: {order.paymentMode}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2 mt-3 md:mt-0">
                  <button
                    onClick={() => handleAccept(order)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(order)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* System Messages Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3">System Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500">No more system messages.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li
                key={msg.id}
                onClick={() => !msg.read && markAsRead(msg.id)}
                className={`p-3 border rounded-lg cursor-pointer ${
                  msg.read
                    ? "bg-gray-200 text-gray-600"
                    : "bg-yellow-200 font-medium"
                }`}
              >
                {msg.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/seller")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Notifications;



