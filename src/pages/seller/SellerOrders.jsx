import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../redux/OrdersSlice";

function SellerOrders() {
  const orders = useSelector((state) => state.orders.orders) || [];
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("New");

  //  localStorage for reportSubmitted
  const [reportSubmitted, setReportSubmitted] = useState(
    JSON.parse(localStorage.getItem("reportSubmitted")) || {}
  );

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveredTime, setDeliveredTime] = useState("");

  const filteredOrders = orders.filter((order) => order.status === filter);

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  const openReportModal = (order) => {
    setSelectedOrder(order);
    setDeliveredTime(reportSubmitted[order.id]?.deliveredTime || "");
  };

  const closeReportModal = () => {
    setSelectedOrder(null);
    setDeliveredTime("");
  };

  const handleReportSubmit = () => {
    if (!deliveredTime) {
      alert("Please enter delivered time!");
      return;
    }

    const updatedReports = {
      ...reportSubmitted,
      [selectedOrder.id]: { submitted: true, deliveredTime },
    };

    setReportSubmitted(updatedReports);
    localStorage.setItem("reportSubmitted", JSON.stringify(updatedReports));
    closeReportModal();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto ml-64">
      <h1 className="text-2xl font-bold mb-6 text-center">Orders</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-3 justify-center mb-6">
        {["New", "Pending", "Completed", "Cancelled", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${filter === f
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No {filter} orders.</p>
      ) : (
        <ul className="space-y-4">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="p-4 border rounded-lg shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* Order Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={order.imageUrl}
                  alt={order.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{order.name}</p>
                  <p className="text-sm text-gray-600">
                    Category: {order.category}
                  </p>
                  <p className="text-sm">Qty: {order.quantity}</p>
                  <p className="text-sm">₹{order.price}</p>
                  <p className="text-sm">Restaurant: {order.restaurant}</p>
                  <p className="text-sm">Address: {order.address}</p>
                  <p className="text-sm">Delivery: {order.deliveryTime}</p>
                  <p className="text-sm">Payment: {order.paymentMode}</p>
                  <p className="text-xs text-gray-500">
                    Status:{" "}
                    <span className="font-semibold">{order.status}</span>
                  </p>
                  {reportSubmitted[order.id]?.submitted && (
                    <p className="text-xs text-green-600 mt-1">
                      Delivered at: {reportSubmitted[order.id].deliveredTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3 md:mt-0">
                {filter === "New" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order.id, "Pending")}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, "Cancelled")}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {filter === "Pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order.id, "Completed")}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, "Cancelled")}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {filter === "Completed" && (
                  <button
                    onClick={() => openReportModal(order)}
                    disabled={reportSubmitted[order.id]?.submitted}
                    className={`px-3 py-1 rounded-lg ${reportSubmitted[order.id]?.submitted
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                  >
                    {reportSubmitted[order.id]?.submitted
                      ? "Report Submitted"
                      : "Submit Report"}
                  </button>
                )}

                {/* Rejected orders */}
                {filter === "Rejected" && (
                  <span className="text-sm text-gray-500">
                    This order was rejected.
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-semibold mb-4">Submit Report</h2>
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={selectedOrder.imageUrl}
                alt={selectedOrder.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium">{selectedOrder.name}</p>
                <p className="text-sm">Qty: {selectedOrder.quantity}</p>
                <p className="text-sm">₹{selectedOrder.price}</p>
                <p className="text-sm">Category: {selectedOrder.category}</p>
                <p className="text-sm">Restaurant: {selectedOrder.restaurant}</p>
                <p className="text-sm">Address: {selectedOrder.address}</p>
                <p className="text-sm">Payment: {selectedOrder.paymentMode}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Delivered Time
              </label>
              <input
                type="text"
                placeholder="e.g. 9:45 PM"
                value={deliveredTime}
                onChange={(e) => setDeliveredTime(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-red-200"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeReportModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerOrders;






