import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle,
  FaEdit,
  FaSave,
  FaBan,
  FaUndo,
} from "react-icons/fa";

function SellerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  // Load seller data from localStorage
  useEffect(() => {
    const storedSellers = JSON.parse(localStorage.getItem("sellers")) || [];
    const foundSeller = storedSellers.find((s) => s.id === parseInt(id));
    if (foundSeller) {
      setSeller(foundSeller);
      setEditedData(foundSeller);
    }
  }, [id]);

  // Save updated seller back to localStorage
  const updateSellerInStorage = (updated) => {
    const sellers = JSON.parse(localStorage.getItem("sellers")) || [];
    const newSellers = sellers.map((s) =>
      s.id === updated.id ? updated : s
    );
    localStorage.setItem("sellers", JSON.stringify(newSellers));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        const updated = { ...seller, profilePhoto: reader.result };
        setSeller(updated);
        updateSellerInStorage(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => setEditing(!editing);

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSeller(editedData);
    updateSellerInStorage(editedData);
    setEditing(false);
  };

  const handleSuspend = () => {
    const updated = {
      ...seller,
      status: seller.status === "active" ? "suspended" : "active",
    };
    setSeller(updated);
    setEditedData(updated);
    updateSellerInStorage(updated);
  };

  if (!seller) {
    return (
      <div className="ml-64 p-6">
        <p>Seller not found</p>
      </div>
    );
  }

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate("/admin/sellers")}
        className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white rounded flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Sellers
      </button>

      {/* Profile card */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Profile photo */}
        <div className="flex flex-col items-center mb-6">
          {profilePhoto || seller.profilePhoto ? (
            <img
              src={profilePhoto || seller.profilePhoto}
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

        {/* Seller details */}
        <div className="space-y-4">
          {[
            { label: "Restaurant Name", field: "restaurantName" },
            { label: "Owner", field: "owner" },
            { label: "Email", field: "email" },
            { label: "Phone", field: "phone" },
            { label: "Location", field: "location" },
            { label: "Cuisine", field: "cuisine" },
            { label: "Total Orders", field: "totalOrders" },
            { label: "Earnings", field: "earnings" },
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
                    type={
                      field === "totalProducts" || field === "totalRevenue"
                        ? "number"
                        : "text"
                    }
                    value={editedData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                )
              ) : (
                <span className="text-gray-800">
                  {field === "totalRevenue"
                    ? `₹${seller[field]}`
                    : seller[field]}
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
            className={`flex items-center gap-2 px-4 py-2 rounded text-white ${seller.status === "active" ? "bg-red-500" : "bg-gray-600"
              }`}
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
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;


