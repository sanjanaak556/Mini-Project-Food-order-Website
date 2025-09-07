import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaBan,
  FaUndo,
  FaUsers,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    totalOrders: "",
    totalSpend: "",
    verification: "",
    status: "",
  });

  const navigate = useNavigate();

  // Load from LocalStorage or API
  useEffect(() => {
    const saved = localStorage.getItem("customers");
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      axios
        .get(
          "https://sanjanaak556.github.io/Customer-details-API/customers.json"
        )
        .then((res) => {
          setCustomers(res.data);
          localStorage.setItem("customers", JSON.stringify(res.data));
        })
        .catch((err) => console.error("Error fetching customers:", err));
    }
  }, []);

  // Save to LocalStorage whenever customers change
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }, [customers]);

  // Filter customers
  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || cust.status === filterStatus;

    const matchesVerification =
      filterVerification === "all" || cust.verification === filterVerification;

    return matchesSearch && matchesStatus && matchesVerification;
  });

  // Handle Edit
  const handleEdit = (cust) => {
    setEditingCustomer(cust.id);
    setEditedData({ ...cust });
  };

  const handleSaveEdit = () => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === editingCustomer ? editedData : c))
    );
    setEditingCustomer(null);
  };

  // Handle Suspend / Unsuspend
  const handleSuspend = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "suspended" : "active" }
          : c
      )
    );
  };

  // Generic input change handler
  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Add New Customer
  const handleAddNew = () => {
    const newId = customers.length ? customers[customers.length - 1].id + 1 : 1;
    const customerToAdd = { id: newId, ...newCustomer };
    setCustomers((prev) => [...prev, customerToAdd]);
    setShowModal(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      location: "",
      totalOrders: "",
      totalSpend: "",
      verification: "",
      status: "",
    });
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaUsers className="text-blue-600" /> Manage Customers
      </h2>

      {/* Add New Customer Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlus /> Add New Customer
        </button>
      </div>

      {/* Modal for Add Customer */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Customer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={newCustomer.location}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, location: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Total Orders"
                value={newCustomer.totalOrders}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    totalOrders: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Total Spend"
                value={newCustomer.totalSpend}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    totalSpend: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded"
              />
              <select
                value={newCustomer.verification}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    verification: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded"
              >
                <option value="">Verification Status</option>
                <option value="done">Verified</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={newCustomer.status}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, status: e.target.value })
                }
                className="border px-2 py-1 rounded"
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div className="flex items-center bg-white shadow rounded px-3 py-2 w-full md:w-1/3">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or email..."
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
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Spend</th>
              <th className="p-3 text-left">Verification</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr
                key={cust.id}
                className={`border-b transition ${
                  cust.status === "suspended"
                    ? "bg-gray-200 opacity-70"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3">{cust.id}</td>

                {/* Editable fields */}
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    cust.name
                  )}
                </td>
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    cust.email
                  )}
                </td>
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  ) : (
                    cust.phone
                  )}
                </td>
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  ) : (
                    cust.location
                  )}
                </td>
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.totalOrders}
                      onChange={(e) =>
                        handleChange("totalOrders", e.target.value)
                      }
                    />
                  ) : (
                    cust.totalOrders
                  )}
                </td>
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.totalSpend}
                      onChange={(e) =>
                        handleChange("totalSpend", e.target.value)
                      }
                    />
                  ) : (
                    `₹${cust.totalSpend}`
                  )}
                </td>
                <td className="p-3">
                  {editingCustomer === cust.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={editedData.verification}
                      onChange={(e) =>
                        handleChange("verification", e.target.value)
                      }
                    >
                      <option value="done">Verified</option>
                      <option value="pending">Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`font-semibold ${
                        cust.verification === "done"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {cust.verification}
                    </span>
                  )}
                </td>
                <td className="p-3">{cust.status}</td>

                {/* Actions */}
                <td className="p-3 space-x-2 flex">
                  {editingCustomer === cust.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate(`/admin/customers/${cust.id}`)}
                        className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleEdit(cust)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleSuspend(cust.id)}
                        className={`px-2 py-1 text-white rounded flex items-center gap-1 ${
                          cust.status === "active"
                            ? "bg-red-500"
                            : "bg-gray-600"
                        }`}
                      >
                        {cust.status === "active" ? (
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
    </div>
  );
}

export default ManageCustomers;


