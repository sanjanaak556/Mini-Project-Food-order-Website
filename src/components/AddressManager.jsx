import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaPlus } from "react-icons/fa";

function AddressManager() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [showAddressBox, setShowAddressBox] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);

  // Load saved addresses from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);

    const def = localStorage.getItem("defaultAddress");
    if (def) setDefaultAddress(def);
  }, []);

  // Save addresses whenever they change
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
    if (defaultAddress) {
      localStorage.setItem("defaultAddress", defaultAddress);
    }
  }, [addresses, defaultAddress]);

  // Add new address
  const handleAddAddress = () => {
    if (newAddress.trim() === "") return;
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    setNewAddress("");
    setShowAddressBox(false);
  };

  // Set default address
  const handleSetDefault = (addr) => {
    setDefaultAddress(addr);
  };

  return (
    <div className="flex-1">
      {/* Address Box */}
      <div
        className="flex items-center border rounded-lg px-3 py-3 shadow-sm cursor-pointer bg-white"
        onClick={() => setShowAddressBox(!showAddressBox)}
      >
        <FaMapMarkedAlt className="text-gray-500 mr-2" size={20} />
        <span className="flex-1 text-gray-600">
          {defaultAddress ? defaultAddress : "Select or add address"}
        </span>
      </div>

      {/* Dropdown with saved addresses */}
      {showAddressBox && (
        <div className="mt-2 p-4 border rounded-lg bg-gray-50 shadow-md">
          {/* List saved addresses */}
          {addresses.length > 0 ? (
            addresses.map((addr, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-gray-700">{addr}</span>
                <button
                  onClick={() => handleSetDefault(addr)}
                  className={`px-3 py-1 rounded text-sm ${defaultAddress === addr
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {defaultAddress === addr ? "Default" : "Set Default"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm mb-2">
              No addresses saved yet.
            </p>
          )}

          {/* Add new address */}
          {newAddress === "" && (
            <button
              onClick={() => setNewAddress(" ")}
              className="flex items-center text-red-500 mt-2"
            >
              <FaPlus size={18} className="mr-1" /> Add New Address
            </button>
          )}

          {newAddress !== "" && (
            <div className="mt-2">
              <textarea
                rows="2"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter your new address..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddAddress}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddressManager;
