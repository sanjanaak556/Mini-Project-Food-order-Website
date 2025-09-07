import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function SellerMenu() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // track editing card
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    image: "",
    veg: "false",
    bestSeller: "false",
    rating: "",
    isNew: true,
    outOfStock: false,
  });

  // Load initial data from localStorage or API
  useEffect(() => {
    const stored = localStorage.getItem("sellerMenu");
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      axios
        .get("https://sanjanaak556.github.io/Menu-API/menu.json")
        .then((res) => {
          const formatted = res.data.map((item) => ({
            ...item,
            isNew: false,
            outOfStock: false,
            veg: String(item.veg) === "true" ? "true" : "false",
            bestSeller: String(item.bestSeller) === "true" ? "true" : "false",
          }));
          setItems(formatted);
          localStorage.setItem("sellerMenu", JSON.stringify(formatted));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // Sync items to localStorage
  useEffect(() => {
    localStorage.setItem("sellerMenu", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.price || !newItem.image || !newItem.veg || !newItem.bestSeller || !newItem.rating) {
      alert("Please fill all required fields!");
      return;
    }

    if (editIndex !== null) {
      // Update existing card
      const updated = [...items];
      updated[editIndex] = { ...newItem, isNew: true };
      setItems(updated);
      setEditIndex(null);
      alert("Item updated successfully");
    } else {
      // Add new card
      setItems([...items, { ...newItem }]);
      alert("New item added to the menu successfully");
    }

    setNewItem({
      name: "",
      price: "",
      image: "",
      veg: "false",
      bestSeller: "false",
      rating: "",
      isNew: true,
      outOfStock: false,
    });
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleToggleStock = (index) => {
    const updated = [...items];
    updated[index].outOfStock = !updated[index].outOfStock;
    setItems(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewItem({ ...items[index] });
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* ===== Form ===== */}
      <h2 className="text-2xl font-bold mb-4">
        {editIndex !== null ? "Edit Item" : "Add a New Item"}
      </h2>
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newItem.image}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="veg"
          value={newItem.veg}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Veg/Non-Veg</option>
          <option value="true">Veg</option>
          <option value="false">Non-Veg</option>
        </select>
        <select
          name="bestSeller"
          value={newItem.bestSeller}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Bestseller</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          name="rating"
          placeholder="Rating (0 - 5)"
          value={newItem.rating}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <div className="col-span-2 flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => {
              setNewItem({
                name: "",
                price: "",
                image: "",
                veg: "false",
                bestSeller: "false",
                rating: "",
                isNew: true,
                outOfStock: false,
              });
              setEditIndex(null);
            }}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </div>
      </form>

      {/* ===== Menu Cards ===== */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Menu Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow relative ${
              item.outOfStock ? "opacity-50" : ""
            }`}
          >
            {/* Buttons (Edit / Delete / Stock) */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                className="text-gray-600 hover:text-blue-600"
                title="Edit"
                onClick={() => handleEdit(index)}
              >
                <FiEdit />
              </button>
              <button
                className="text-gray-600 hover:text-red-600"
                title="Delete"
                onClick={() => handleDelete(index)}
              >
                <FiTrash2 />
              </button>
              <button
                className="text-xs px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => handleToggleStock(index)}
              >
                {item.outOfStock ? "Out of Stock" : "In Stock"}
              </button>
            </div>

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-contain rounded-t-lg bg-gray-100"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <p className="italic text-sm text-gray-500">
                Craveyard Restaurant, Thalassery
              </p>

              {/* Conditional badges */}
              <div className="mt-2 flex gap-2">
                {item.veg === "true" && (
                  <span className="text-green-600 text-xs font-semibold">
                    Pure Veg
                  </span>
                )}
                {item.bestSeller === "true" && (
                  <span className="text-orange-600 text-xs font-semibold">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Ratings */}
              <div className="mt-2">
                {item.rating && <p>⭐ {item.rating}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerMenu;


