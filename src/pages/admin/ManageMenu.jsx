// pages/admin/ManageMenu.jsx
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUtensils, FaStar, FaCrown } from "react-icons/fa";

function ManageMenu() {
    const [menus, setMenus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [reason, setReason] = useState("");

    // Load menu data
    useEffect(() => {
        fetch("https://sanjanaak556.github.io/Menu-API/menu.json")
            .then((res) => res.json())
            .then((data) => setMenus(data));
    }, []);

    const handleRemoveClick = (menu) => {
        setSelectedMenu(menu);
        setReason("");
        setShowModal(true);
    };

    const handleSend = () => {
        if (!reason.trim()) {
            alert("Please enter a reason for removing this menu item.");
            return;
        }
        alert(
            `Menu removed!\n\nSeller: ${selectedMenu.restaurant}\nReason: ${reason}`
        );
        setMenus((prev) => prev.filter((m) => m.id !== selectedMenu.id));
        setShowModal(false);
    };

    return (
        <div className="p-6 md:ml-64">
            <div className="flex items-center mb-6 space-x-3">
                <FaUtensils className="text-2xl text-green-600" />
                <h1 className="text-2xl font-bold">Manage Menus</h1>
            </div>

            {/* Menu grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {menus.map((menu) => (
                    <div
                        key={menu.id}
                        className="border rounded-lg shadow p-4 bg-white flex flex-col"
                    >
                        <img
                            src={menu.image}
                            alt={menu.name}
                            className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h2 className="text-lg font-bold mb-1">{menu.name}</h2>
                        <p className="text-sm text-gray-600 mb-1">
                            Category: {menu.category}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            Restaurant: {menu.restaurant}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
                            <p>₹{menu.price}</p>
                            <p><FaStar className="text-yellow-500" /> {menu.rating}</p>
                        </div>


                        {/* Veg and Best Seller labels */}
                        <div className="flex space-x-3 mb-2">
                            {menu.veg && (
                                <span className="text-green-600 font-semibold">Veg</span>
                            )}
                            {menu.bestSeller && (
                                <span className="text-red-600 font-semibold flex items-center">
                                    <FaCrown className="mr-1" /> Best Seller
                                </span>
                            )}
                        </div>

                        {/* Remove button */}
                        <button
                            onClick={() => handleRemoveClick(menu)}
                            className="mt-auto flex items-center justify-center px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                            <FaTrashAlt className="mr-1" /> Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for removal reason */}
            {showModal && selectedMenu && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                        <h2 className="text-lg font-bold mb-3">
                            Remove {selectedMenu.name}
                        </h2>

                        <label className="block mb-2 text-sm font-semibold">
                            Seller
                        </label>
                        <input
                            type="text"
                            value={selectedMenu.restaurant}
                            disabled
                            className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
                        />

                        <label className="block mb-2 text-sm font-semibold">
                            Reason for Removal
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full border rounded px-3 py-2 h-24 mb-4"
                            placeholder="Type reason here..."
                        ></textarea>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-3 py-1 rounded bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSend}
                                className="px-3 py-1 rounded bg-red-500 text-white"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageMenu;
