import React, { useState } from "react";
import { FaStore } from "react-icons/fa";

function PartnerSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    address: "",
    cuisineType: "",
    openingHours: "",
    deliveryAvailable: "Yes",
    licenseNumber: "",
    licenseDoc: null,
    aadhaarNumber: "",
    aadhaarDoc: null,
    panNumber: "",
    panDoc: null,
    accountNumber: "",
    ifscCode: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Restaurant Registered Successfully 🎉");
    setIsOpen(false);
    setFormData({
      restaurantName: "",
      ownerName: "",
      address: "",
      cuisineType: "",
      openingHours: "",
      deliveryAvailable: "Yes",
      licenseNumber: "",
      licenseDoc: null,
      aadhaarNumber: "",
      aadhaarDoc: null,
      panNumber: "",
      panDoc: null,
      accountNumber: "",
      ifscCode: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="py-16 bg-white text-center relative" id="partner">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Partner With Us & Grow Your Business 🚀
      </h2>
      <p className="text-gray-600 mb-8">
        Join HungerHub and reach thousands of customers every day.
      </p>

      {/* Register Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto hover:bg-green-700 transition"
      >
        <FaStore /> Register Your Restaurant
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative">
            <h3 className="text-2xl font-semibold mb-4">
              Restaurant Registration
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                <input
                  type="text"
                  name="restaurantName"
                  placeholder="Restaurant Name"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Restaurant Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="cuisineType"
                  placeholder="Cuisine Type (e.g., Indian, Chinese)"
                  value={formData.cuisineType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="openingHours"
                  placeholder="Opening Hours (e.g., 10 AM - 11 PM)"
                  value={formData.openingHours}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <select
                  name="deliveryAvailable"
                  value={formData.deliveryAvailable}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                >
                  <option value="Yes">Delivery Available</option>
                  <option value="No">No Delivery</option>
                </select>
              </div>

              {/* Right Column */}
              <div>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="file"
                  name="licenseDoc"
                  accept="image/*,.pdf"
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="file"
                  name="aadhaarDoc"
                  accept="image/*,.pdf"
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="panNumber"
                  placeholder="PAN Number"
                  value={formData.panNumber}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="file"
                  name="panDoc"
                  accept="image/*,.pdf"
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
              </div>

              {/* Full Width Row */}
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Bank Account Number"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="IFSC Code"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerSection;

