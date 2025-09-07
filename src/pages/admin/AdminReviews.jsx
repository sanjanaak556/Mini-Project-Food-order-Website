import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function AdminReviews() {
  const [adminReviews, setAdminReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews.json") 
      .then((res) => res.json())
      .then((data) => setAdminReviews(data))
      .catch((err) => console.error("Error fetching admin reviews:", err));
  }, []);

  // Helper function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-500">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
  <FaStar className="text-yellow-500" /> What Customers Say
</h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Customer Info */}
            <h3 className="font-semibold text-lg text-gray-800">
              {review.customerName}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{review.address}</p>
            <p className="text-sm text-indigo-600 font-medium mb-2">
              Restaurant: {review.restaurant}
            </p>

            {/* Rating */}
            {renderStars(review.rating)}

            {/* Review Text */}
            <p className="mt-3 text-gray-700 italic">"{review.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReviews;
