import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaBan,
  FaUndo,
  FaUserCircle,
} from "react-icons/fa";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Load customer data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("customers");
    if (saved) {
      const customers = JSON.parse(saved);
      const found = customers.find((c) => c.id.toString() === id);
      if (found) {
        setCustomer(found);
        setEditedData(found);
        if (found.profilePhoto) {
          setProfilePhoto(found.profilePhoto);
        }
      }
    }
  }, [id]);

  // Save changes back to localStorage
  const saveToLocalStorage = (updated) => {
    const saved = JSON.parse(localStorage.getItem("customers")) || [];
    const newData = saved.map((c) => (c.id === updated.id ? updated : c));
    localStorage.setItem("customers", JSON.stringify(newData));
  };

  // Handle edit toggle
  const handleEditToggle = () => {
    setEditing(!editing);
  };

  // Save edits
  const handleSave = () => {
    const updated = { ...editedData, profilePhoto };
    setCustomer(updated);
    saveToLocalStorage(updated);
    setEditing(false);
  };

  // Handle suspend/unsuspend
  const handleSuspend = () => {
    const newStatus = customer.status === "active" ? "suspended" : "active";
    const updated = { ...customer, status: newStatus };
    setCustomer(updated);
    saveToLocalStorage(updated);
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
        setEditedData((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!customer) {
    return <p className="ml-64 p-6">Customer not found</p>;
  }

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate("/admin/customers")}
        className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white rounded flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Customers
      </button>

      {/* Profile card */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Profile photo */}
        <div className="flex flex-col items-center mb-6">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <FaUserCircle className="text-7xl" />
              <p className="text-sm">No profile photo</p>
            </div>
          )}
          <label className="mt-3 cursor-pointer text-blue-600 hover:underline text-sm">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Customer details */}
        <div className="space-y-4">
          {[
            { label: "Name", field: "name" },
            { label: "Email", field: "email" },
            { label: "Phone", field: "phone" },
            { label: "Location", field: "location" },
            { label: "Orders", field: "totalOrders" },
            { label: "Spend", field: "totalSpend" },
            { label: "Verification", field: "verification" },
            { label: "Status", field: "status" },
          ].map(({ label, field }) => (
            <div key={field} className="flex justify-between">
              <span className="font-semibold text-gray-700">{label}:</span>
              {editing ? (
                field === "verification" || field === "status" ? (
                  <select
                    value={editedData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    {field === "verification" ? (
                      <>
                        <option value="done">Verified</option>
                        <option value="pending">Pending</option>
                      </>
                    ) : (
                      <>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={field === "totalOrders" || field === "totalSpend" ? "number" : "text"}
                    value={editedData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                )
              ) : (
                <span className="text-gray-800">
                  {field === "totalSpend" ? `₹${customer[field]}` : customer[field]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          {editing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              <FaSave /> Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              <FaEdit /> Edit
            </button>
          )}

          <button
            onClick={handleSuspend}
            className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
              customer.status === "active" ? "bg-red-500" : "bg-gray-600"
            }`}
          >
            {customer.status === "active" ? (
              <>
                <FaBan /> Suspend
              </>
            ) : (
              <>
                <FaUndo /> Unsuspend
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;

