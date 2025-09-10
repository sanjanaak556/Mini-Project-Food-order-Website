import React from "react";
import {
  FaShoppingCart,
  FaStar,
  FaRupeeSign,
} from "react-icons/fa";

function SellerDashboard() {

  // Dummy stats 
  const stats = [
    {
      title: "Orders this month",
      value: 256,
      icon: <FaShoppingCart className="text-blue-600 text-2xl" />,
    },
    {
      title: "Current Rating",
      value: "4.5 / 5",
      icon: <FaStar className="text-yellow-500 text-2xl" />,
    },
    {
      title: "Revenue this month",
      value: "₹35,000",
      icon: <FaRupeeSign className="text-green-600 text-2xl" />,
    },
  ];

  return (
    <div className="ml-64 min-h-screen relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg-2.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Overlay content */}
      <div className="relative p-8">
        {/* Welcome section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-red-600">Seller</span>
          </h1>
          <p className="mt-3 text-white font-semibold text-xl">
            Your store, your journey. Grow sales, track performance, and build lasting customer relationships.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

export default SellerDashboard;


