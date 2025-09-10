import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiSave, FiPlus, FiX } from "react-icons/fi";

export default function SellerDiscounts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    image: "",
    veg: false,
    frequentlyReordered: false,
    typeOfDiscount: "",
    discountInterval: "",
    originalPrice: "",
    discountPrice: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Load discounts from API + localStorage
  useEffect(() => {
    axios
      .get("/data/offersDiscounts.json")
      .then((res) => {
        const apiData = Array.isArray(res.data) ? res.data : [];
        const discountItems = apiData.filter((i) => i.typeOfDiscount);
        const localData = JSON.parse(localStorage.getItem("seller_discounts_local") || "[]");
        setItems([...discountItems, ...localData]);
      })
      .catch(() => {
        const localData = JSON.parse(localStorage.getItem("seller_discounts_local") || "[]");
        setItems(localData);
      });
  }, []);

  // Save to localStorage every time items change
  useEffect(() => {
    localStorage.setItem("seller_discounts_local", JSON.stringify(items));
  }, [items]);

  // Validate form
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.image.trim()) e.image = "Image URL is required";
    if (!form.typeOfDiscount.trim()) e.typeOfDiscount = "Discount type required";
    if (!form.discountInterval.trim()) e.discountInterval = "Discount interval required";
    if (!form.originalPrice) e.originalPrice = "Original price required";
    if (!form.discountPrice) e.discountPrice = "Discount price required";
    if (!form.rating) e.rating = "Rating is required";
    return e;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    const newItem = {
      ...form,
      id: editingId || Date.now(),
    };

    if (editingId) {
      setItems((prev) => prev.map((it) => (it.id === editingId ? newItem : it)));
    } else {
      setItems((prev) => [newItem, ...prev]);
    }

    // Reset form
    setForm({
      id: null,
      name: "",
      image: "",
      veg: false,
      frequentlyReordered: false,
      typeOfDiscount: "",
      discountInterval: "",
      originalPrice: "",
      discountPrice: "",
      rating: "",
    });
    setEditingId(null);
    setErrors({});
  }

  function handleCancel() {
    setForm({
      id: null,
      name: "",
      image: "",
      veg: false,
      frequentlyReordered: false,
      typeOfDiscount: "",
      discountInterval: "",
      originalPrice: "",
      discountPrice: "",
      rating: "",
    });
    setEditingId(null);
    setErrors({});
  }

  function handleEdit(item) {
    setForm(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!window.confirm("Remove this discount?")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FiPlus /> Add a new discount
        </h2>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL *</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.image ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Type of Discount *</label>
            <input
              name="typeOfDiscount"
              value={form.typeOfDiscount}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.typeOfDiscount ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.typeOfDiscount && <p className="text-red-500 text-sm">{errors.typeOfDiscount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Discount Ends *</label>
            <input
              name="discountInterval"
              value={form.discountInterval}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.discountInterval ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.discountInterval && <p className="text-red-500 text-sm">{errors.discountInterval}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Original Price *</label>
            <input
              name="originalPrice"
              type="number"
              value={form.originalPrice}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.originalPrice ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.originalPrice && <p className="text-red-500 text-sm">{errors.originalPrice}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Discount Price *</label>
            <input
              name="discountPrice"
              type="number"
              value={form.discountPrice}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.discountPrice ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.discountPrice && <p className="text-red-500 text-sm">{errors.discountPrice}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Rating *</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md p-2 border ${errors.rating ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
          </div>

          <div className="flex items-center gap-4 md:col-span-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="veg" checked={form.veg} onChange={handleChange} />
              Veg
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="frequentlyReordered"
                checked={form.frequentlyReordered}
                onChange={handleChange}
              />
              Frequently reordered
            </label>
          </div>

          <div className="md:col-span-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300"
            >
              <FiX /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white"
            >
              <FiSave /> {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Active Discounts */}
      <div className="max-w-6xl mx-auto mt-6">
        <h3 className="text-xl font-semibold mb-4">Active Discounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative">
                <div className="absolute left-3 top-3 bg-green-400 text-sm font-semibold px-3 py-1 rounded-full z-10">
                  {it.typeOfDiscount}
                </div>
                <img src={it.image} alt={it.name} className="w-full h-40 object-cover" />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold">{it.name}</h4>

                <p className={`mt-1 text-sm ${it.veg ? "text-green-600" : "text-red-600"}`}>
                  {it.veg ? "Veg" : "Non-Veg"}
                </p>

                {it.frequentlyReordered && (
                  <p className="text-red-500 text-sm">Frequently Reordered</p>
                )}

                <p className="text-gray-600 text-sm mt-1">
                  Discount Interval: {it.discountInterval}
                </p>
                <p className="text-gray-600 text-sm">Rating: ⭐ {it.rating}</p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="line-through text-gray-400">₹{it.originalPrice}</div>
                  <div className="font-bold">₹{it.discountPrice}</div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(it)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(it.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <p>No active discounts.</p>}
        </div>
      </div>
    </div>
  );
}






