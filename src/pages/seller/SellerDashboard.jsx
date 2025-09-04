import React from "react";

function SellerDashboard() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Hero Section */}
      <h1 className="text-3xl font-bold mb-4">
        Welcome back, <span className="text-red-600">Seller!</span>
      </h1>
      <p className="text-gray-600 max-w-xl mb-6">
        Your success starts here. Manage your store, grow your business, and
        keep delighting your customers with every order you fulfill.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-2xl font-bold">256</p>
          <p className="text-gray-600">Orders this month</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-2xl font-bold">87%</p>
          <p className="text-gray-600">Customer Satisfaction</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-2xl font-bold">₹35,000</p>
          <p className="text-gray-600">Revenue this month</p>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

