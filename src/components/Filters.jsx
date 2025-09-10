import React, { useState } from "react";

function Filters({ onFilterChange, activeFilter }) {
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleFilter = (type, value) => {
    if (type === "schedule") setSelectedSchedule(value);
    if (type === "price") setSelectedPrice(value);

    onFilterChange({ type, value });
  };

  const getButtonClass = (type) =>
    `px-4 py-2 rounded-lg font-medium ${activeFilter === type
      ? "bg-red-600 text-white"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`;

  return (
    <div className="flex flex-wrap gap-3 p-4 justify-center">
      {/* filter buttons */}
      <button onClick={() => handleFilter("all", null)} className={getButtonClass("all")}>
        All
      </button>

      <select
        value={selectedSchedule}
        onChange={(e) => handleFilter("schedule", e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Schedule</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="snacks">Snacks</option>
        <option value="dinner">Dinner</option>
        <option value="desserts">Desserts</option>
      </select>

      <button onClick={() => handleFilter("veg", true)} className={getButtonClass("veg")}>
        Veg
      </button>

      <button onClick={() => handleFilter("veg", false)} className={getButtonClass("nonveg")}>
        Non-Veg
      </button>

      <button onClick={() => handleFilter("bestSeller", true)} className={getButtonClass("bestSeller")}>
        Best Seller
      </button>

      <button onClick={() => handleFilter("rating", 4)} className={getButtonClass("rating")}>
        Rating ≥ 4.0
      </button>

      <select
        value={selectedPrice}
        onChange={(e) => handleFilter("price", e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Price</option>
        <option value="lowToHigh">Low → High</option>
        <option value="highToLow">High → Low</option>
      </select>
    </div>
  );
}

export default Filters;
