import React from "react";
import {
  FaUsers,
  FaStore,
  FaShoppingCart,
  FaStar,
  FaRupeeSign,
} from "react-icons/fa";

function AdminDashboard() {

  // Dummy stats (can be replaced with API later)
  const stats = [
    {
      title: "Orders this month",
      value: 128,
      icon: <FaShoppingCart className="text-blue-600 text-2xl" />,
    },
    {
      title: "Total Customers",
      value: 542,
      icon: <FaUsers className="text-green-600 text-2xl" />,
    },
    {
      title: "Total Sellers",
      value: 75,
      icon: <FaStore className="text-purple-600 text-2xl" />,
    },
    {
      title: "Revenue this month",
      value: "₹1,24,500",
      icon: <FaRupeeSign className="text-yellow-600 text-2xl" />,
    },
    {
      title: "Current Rating",
      value: "4.7 / 5",
      icon: <FaStar className="text-orange-500 text-2xl" />,
    },
  ];

  return (
    <div className="ml-64 min-h-screen relative flex flex-col items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg-3.jpg" // Replace with your own image
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Overlay content */}
      <div className="relative p-8">
        {/* Welcome section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-blue-600">Admin</span>
          </h1>
          <p className="mt-3 text-white font-semibold text-xl">
            Shape the future of your marketplace. Every decision here fuels growth, innovation, and customer satisfaction.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition transform hover:scale-105"
            >
              <div className="mb-4">{stat.icon}</div>
              <h2 className="text-lg font-semibold text-gray-700">
                {stat.title}
              </h2>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
