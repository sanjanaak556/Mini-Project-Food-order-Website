import React, { useState } from "react";
import { FaComments } from "react-icons/fa";

function ContactSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        reason: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message submitted successfully ✅");
        setIsOpen(false);
        setFormData({ name: "", email: "", reason: "", message: "" });
    };

    return (
        <div className="py-16 bg-gray-100 text-center relative" id="contact">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Stay Connected With Us
            </h2>
            <p className="text-gray-600 mb-8">
                Have questions? We're just a message away!
            </p>

            {/* Chat Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto hover:bg-red-600 transition"
            >
                <FaComments /> Contact Us
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        <h3 className="text-xl font-semibold mb-4">Contact Form</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 mb-3"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 mb-3"
                            />
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 mb-3"
                            >
                                <option value="">Reason for Contact</option>
                                <option value="support">Customer Support</option>
                                <option value="feedback">Feedback</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2 mb-3"
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                            >
                                Send
                            </button>
                        </form>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactSection;
