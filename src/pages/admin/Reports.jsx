import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFlag,
  FaSearch,
} from "react-icons/fa";

function Reports() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // Load fake API
  useEffect(() => {
    fetch("https://sanjanaak556.github.io/API-Seller-Orders/Sellers.json") 
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error loading reports:", err));
  }, []);

  // Handle status change
  const updateStatus = (id, newStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, actionStatus: newStatus } : report
      )
    );
  };

  // Filter + Search logic
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.id.toString().includes(searchTerm);
    const matchesFilter =
      filter === "All" || report.actionStatus === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 w-full ml-64">
      <h2 className="text-2xl font-bold mb-4">Order Delivery Reports</h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by Order ID"
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <select
          className="border px-3 py-2 rounded-lg md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Flagged">Flagged</option>
        </select>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
          >
            {/* Image + Title */}
            <img
              src={report.imageUrl}
              alt={report.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{report.name}</h3>
            <p className="text-gray-600 text-sm mb-2">Order ID: {report.id}</p>

            {/* Order Details */}
            <div className="text-sm text-gray-700 space-y-1 mb-3">
              <p>
                <span className="font-semibold">Delivered At:</span>{" "}
                {report.deliveredAt}
              </p>
              <p>
                <span className="font-semibold">Restaurant:</span>{" "}
                {report.restaurant}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {report.category}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {report.quantity}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ₹{report.price}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {report.paymentMode}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {report.address}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-auto">
              <button
                onClick={() => updateStatus(report.id, "Approved")}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white ${
                  report.actionStatus === "Approved"
                    ? "bg-green-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                <FaCheckCircle />
                {report.actionStatus === "Approved"
                  ? "Approved"
                  : "Approve"}
              </button>

              <button
                onClick={() => updateStatus(report.id, "Rejected")}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white ${
                  report.actionStatus === "Rejected"
                    ? "bg-red-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                <FaTimesCircle />
                {report.actionStatus === "Rejected" ? "Rejected" : "Reject"}
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    report.id,
                    report.actionStatus === "Flagged"
                      ? "All"
                      : "Flagged"
                  )
                }
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white ${
                  report.actionStatus === "Flagged"
                    ? "bg-yellow-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                <FaFlag />
                {report.actionStatus === "Flagged" ? "Flagged" : "Flag"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
