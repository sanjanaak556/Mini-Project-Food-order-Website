import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEye, FaEdit, FaBan, FaStore, FaPlus, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ManageSellers() {
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newSeller, setNewSeller] = useState({
    id: "",
    restaurantName: "",
    owner: "",
    email: "",
    phone: "",
    location: "",
    cuisine: "",
    totalOrders: "",
    earnings: "",
    verification: "",
    status: "",
  });

  const navigate = useNavigate();

  // Load sellers (from API or localStorage)
  useEffect(() => {
    const localData = localStorage.getItem("sellers");
    if (localData) {
      setSellers(JSON.parse(localData));
    } else {
      axios
        .get("https://sanjanaak556.github.io/Sellers-details-API/sellers.json")
        .then((res) => {
          setSellers(res.data);
          localStorage.setItem("sellers", JSON.stringify(res.data));
        })
        .catch((err) => console.error("Error fetching sellers:", err));
    }
  }, []);

  // Update localStorage whenever sellers state changes
  useEffect(() => {
    if (sellers.length > 0) {
      localStorage.setItem("sellers", JSON.stringify(sellers));
    }
  }, [sellers]);

  // Filtering
  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      seller.owner.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || seller.status === filterStatus;

    const matchesVerification =
      filterVerification === "all" || seller.verification === filterVerification;

    return matchesSearch && matchesStatus && matchesVerification;
  });

  // Handle Inline Edit
  const handleEdit = (seller) => {
    setEditingSeller(seller.id);
    setEditedData({ ...seller });
  };

  const handleSaveEdit = () => {
    setSellers((prev) =>
      prev.map((s) => (s.id === editingSeller ? editedData : s))
    );
    setEditingSeller(null);
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle suspend/unsuspend
  const toggleSuspend = (id) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "suspended" : "active" }
          : s
      )
    );
  };

  // Handle Add New Seller
  const handleAddSeller = () => {
    if (
      !newSeller.restaurantName ||
      !newSeller.owner ||
      !newSeller.email ||
      !newSeller.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newEntry = {
      ...newSeller,
      id: sellers.length > 0 ? sellers[sellers.length - 1].id + 1 : 1,
    };

    setSellers((prev) => [...prev, newEntry]);
    setShowModal(false);
    setNewSeller({
      id: "",
      restaurantName: "",
      owner: "",
      email: "",
      phone: "",
      location: "",
      cuisine: "",
      totalOrders: "",
      earnings: "",
      verification: "",
      status: "",
    });
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaStore className="text-green-600" /> Manage Sellers
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2 shadow"
        >
          <FaPlus /> Add New Seller
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div className="flex items-center bg-white shadow rounded px-3 py-2 w-full md:w-1/3">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by restaurant or owner..."
            className="outline-none flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            className="px-3 py-2 rounded border"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            className="px-3 py-2 rounded border"
            value={filterVerification}
            onChange={(e) => setFilterVerification(e.target.value)}
          >
            <option value="all">All Verification</option>
            <option value="done">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Restaurant</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Cuisine</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Earnings</th>
              <th className="p-3 text-left">Verification</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller) => (
              <tr
                key={seller.id}
                className={`border-b hover:bg-gray-50 transition ${seller.status === "suspended" ? "opacity-50" : ""
                  }`}
              >
                <td className="p-3">{seller.id}</td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.restaurantName}
                      onChange={(e) => handleChange("restaurantName", e.target.value)}
                    />
                  ) : (
                    seller.restaurantName
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.owner}
                      onChange={(e) => handleChange("owner", e.target.value)}
                    />
                  ) : (
                    seller.owner
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      type="email"
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    seller.email
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  ) : (
                    seller.phone
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  ) : (
                    seller.location
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.cuisine}
                      onChange={(e) => handleChange("cuisine", e.target.value)}
                    />
                  ) : (
                    seller.cuisine
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.totalOrders}
                      onChange={(e) => handleChange("totalOrders", e.target.value)}
                    />
                  ) : (
                    seller.totalOrders
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.earnings}
                      onChange={(e) => handleChange("earnings", e.target.value)}
                    />
                  ) : (
                    `₹${seller.earnings}`
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.verification}
                      onChange={(e) => handleChange("verification", e.target.value)}
                    >
                      <option value="done">Verified</option>
                      <option value="pending">Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`font-semibold ${seller.verification === "done"
                          ? "text-green-600"
                          : "text-red-500"
                        }`}
                    >
                      {seller.verification}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {editingSeller === seller.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  ) : (
                    seller.status
                  )}
                </td>
                <td className="p-3 space-x-2 flex">
                  {editingSeller === seller.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                        onClick={() => navigate(`/admin/sellers/${seller.id}`)}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded flex items-center gap-1"
                        onClick={() => handleEdit(seller)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className={`px-2 py-1 text-white rounded flex items-center gap-1 ${seller.status === "active" ? "bg-red-500" : "bg-gray-600"
                          }`}
                        onClick={() => toggleSuspend(seller.id)}
                      >
                        {seller.status === "active" ? (
                          <>
                            <FaBan /> Suspend
                          </>
                        ) : (
                          <>
                            <FaUndo /> Unsuspend
                          </>
                        )}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Seller Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Seller</h3>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Restaurant Name"
                className="border px-3 py-2 rounded"
                value={newSeller.restaurantName}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, restaurantName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Owner"
                className="border px-3 py-2 rounded"
                value={newSeller.owner}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, owner: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded"
                value={newSeller.email}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                className="border px-3 py-2 rounded"
                value={newSeller.phone}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="border px-3 py-2 rounded"
                value={newSeller.location}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Cuisine"
                className="border px-3 py-2 rounded"
                value={newSeller.cuisine}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, cuisine: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Total Orders"
                className="border px-3 py-2 rounded"
                value={newSeller.totalOrders}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, totalOrders: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Earnings"
                className="border px-3 py-2 rounded"
                value={newSeller.earnings}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, earnings: e.target.value })
                }
              />
              <select
                className="border px-3 py-2 rounded"
                value={newSeller.verification}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, verification: e.target.value })
                }
              >
                <option value="">Verification Status</option>
                <option value="done">Verified</option>
                <option value="pending">Pending</option>
              </select>
              <select
                className="border px-3 py-2 rounded"
                value={newSeller.status}
                onChange={(e) =>
                  setNewSeller({ ...newSeller, status: e.target.value })
                }
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSeller}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSellers;




