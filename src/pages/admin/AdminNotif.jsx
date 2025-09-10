import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

function AdminNotif() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications from localStorage 
  useEffect(() => {
    const stored = localStorage.getItem("admin_notifications");
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n) => !n.read).length);
    } else {
      axios
        .get("/data/notifications.json")
        .then((res) => {
          const dataWithRead = res.data.map((n) => ({ ...n, read: false }));
          setNotifications(dataWithRead);
          setUnreadCount(dataWithRead.length);
          localStorage.setItem("admin_notifications", JSON.stringify(dataWithRead));
        })
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, []);

  // Handle marking notification as read
  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, read: true, justRead: true } : n
      );
      localStorage.setItem("admin_notifications", JSON.stringify(updated));
      return updated;
    });

    setUnreadCount((prev) => prev - 1);

    // Move to bottom after 2 sec
    setTimeout(() => {
      setNotifications((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((n) => n.id === id);
        if (index !== -1) {
          const [item] = updated.splice(index, 1);
          item.justRead = false;
          updated.push(item);
        }
        localStorage.setItem("admin_notifications", JSON.stringify(updated));
        return updated;
      });
    }, 2000);
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Sidebar Notification Link with Count */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaBell className="text-red-500" /> Notifications
      </h2>
      {/* Unread count badge */}
      {unreadCount > 0 && (
        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {unreadCount}
        </span>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Notifications</h2>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && markAsRead(notif.id)}
              className={`p-4 rounded-lg border cursor-pointer transition duration-300 ${notif.read
                  ? "bg-gray-100 text-gray-600"
                  : "bg-yellow-50 border-yellow-300 text-gray-900"
                } ${notif.justRead ? "animate-pulse" : ""}`}
            >
              <p className="font-medium">{notif.text}</p>
              {notif.message && (
                <p className="text-sm text-gray-500">{notif.message}</p>
              )}
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Type: {notif.messageType || "general"}</span>
                <span>{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminNotif;

