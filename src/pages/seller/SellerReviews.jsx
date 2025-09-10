import React, { useEffect, useState } from "react";

function SellerReviews() {
  const [sellerReviews, setSellerReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => setSellerReviews(data))
      .catch((err) => console.error("Error fetching seller reviews:", err));
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
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        🌟 What People Say
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellerReviews.map((sellerReviews) => (
          <div
            key={sellerReviews.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Customer Info */}
            <h3 className="font-semibold text-lg text-gray-800">
              {sellerReviews.customerName}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{sellerReviews.address}</p>

            {/* Rating */}
            {renderStars(sellerReviews.rating)}

            {/* Review Text */}
            <p className="mt-3 text-gray-700 italic">"{sellerReviews.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerReviews;
