import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFire, FaTags } from "react-icons/fa";
import {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,
} from "../redux/offersSlice";

function OffersAndDiscounts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffersStart());

    fetch("/data/offersDiscounts.json")
      .then((res) => res.json())
      .then((data) => {
        // 🔑 Normalize price as number here before storing in Redux
        const normalized = data.map((item) => ({
          ...item,
          price: Number(item.offerPrice || item.discountPrice || item.originalPrice) || 0,
        }));
        dispatch(fetchOffersSuccess(normalized));
      })
      .catch((err) => {
        dispatch(fetchOffersFailure(err.message));
      });
  }, [dispatch]);

  const offers = items.filter((item) => item.typeOfOffer);
  const discounts = items.filter((item) => item.typeOfDiscount);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="space-y-10 mt-8">
      {/* Offers */}
      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <FaFire className="text-red-500" /> Offers
        </h2>
        {offers.length === 0 ? (
          <p className="text-gray-500">No active offers right now.</p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-3">
            {offers.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/customer/offers/${item.id}`)}
                className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-semibold px-2 py-1 rounded">
                  {item.typeOfOffer}
                </span>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded">
                  <span className="text-gray-300 text-[11px] line-through mr-1">
                    ₹{item.originalPrice}
                  </span>
                  <span className="text-green-400 text-[12px] font-bold">
                    ₹{item.offerPrice}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Discounts */}
      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <FaTags className="text-green-600" /> Discounts
        </h2>
        {discounts.length === 0 ? (
          <p className="text-gray-500">No discounts available right now.</p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-3">
            {[...discounts].reverse().map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/customer/discounts/${item.id}`)}
                className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-semibold px-2 py-1 rounded">
                  {item.typeOfDiscount}
                </span>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded">
                  <span className="text-gray-300 text-[11px] line-through mr-1">
                    ₹{item.originalPrice}
                  </span>
                  <span className="text-green-400 text-[12px] font-bold">
                    ₹{item.discountPrice}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OffersAndDiscounts;



