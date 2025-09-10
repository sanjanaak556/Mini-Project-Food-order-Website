import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { FaSearch, FaUtensils } from "react-icons/fa";
import AddressManager from "../../components/AddressManager";
import OffersAndDiscounts from "../../components/OffersAndDiscounts";
import Filters from "../../components/Filters";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";

function CustomerDashboard() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Redux state 
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    setLoading(true);
    fetch("https://sanjanaak556.github.io/Menu-API/menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setFilteredMenu(data); // default = all
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  // Combined search + filter
  const applyFilters = (filterType = activeFilter, filterValue = null, search = searchTerm) => {
    let data = [...menu];

    // Apply filter first
    if (filterType === "all") data = menu;
    if (filterType === "schedule") data = menu.filter((item) => item.category === filterValue);
    if (filterType === "veg") data = menu.filter((item) => item.veg === filterValue);
    if (filterType === "bestSeller") data = menu.filter((item) => item.bestSeller);
    if (filterType === "rating") data = menu.filter((item) => item.rating >= filterValue);
    if (filterType === "price") {
      data = [...menu].sort((a, b) =>
        filterValue === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // Then apply search
    if (search.trim() !== "") {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.restaurant.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMenu(data);
  };

  // Handle filter change
  const handleFilterChange = ({ type, value }) => {
    setActiveFilter(type);
    applyFilters(type, value, searchTerm);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(activeFilter, null, value);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src="/images/bg-4.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Navbar />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            Welcome to the <span className="text-red-500">Hub</span> where{" "}
            <span className="text-red-500">Hungry</span> meets Happiness...
          </h1>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <p className="text-yellow-600 text-center text-2xl italic">
          Explore delicious menus and exclusive offers tailored for you!!!
        </p>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Bar */}
          <div className="flex items-center border rounded-lg px-3 shadow-sm h-[52px] bg-white">
            <FaSearch className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search for your favorite food or restaurant..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 px-2 py-2 focus:outline-none"
            />
          </div>

          {/* Address Manager */}
          <AddressManager />
        </div>

        {/* Offers & Discounts (hidden when searching) */}
        {searchTerm.trim() === "" && <OffersAndDiscounts />}

        <p className="text-yellow-600 text-center text-2xl italic mt-6">
          What's on your mind today...
        </p>

        {/* Filters */}
        <div className="px-6 mt-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaUtensils className="text-red-500" />
            Explore Menu
          </h2>
          <Filters onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        </div>

        {/* Loading / Products */}
        {loading ? (
          <div className="text-center text-gray-500 mt-6">Loading products...</div>
        ) : filteredMenu.length === 0 ? (
          <p className="text-gray-500 text-xl text-center mt-10">
            Sorry, 🙁 Nothing matches your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredMenu.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;



