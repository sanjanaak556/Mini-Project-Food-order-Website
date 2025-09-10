import React, { useState } from "react";
import { FaComments } from "react-icons/fa";

function HelpChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState([]);

    const faqs = [
        { question: "How do I place an order?", answer: "Browse the menu, add items to your cart, and proceed to checkout. Once payment is complete, your order will be confirmed ✅." },
        { question: "How can I cancel my order?", answer: "Go to 'My Orders' page, select your order, and click the 'Cancel' button (available until the order is processed)." },
        { question: "How do I become a partner restaurant?", answer: "Click 'Partner With Us' on the homepage and fill the registration form. Our team will review and contact you 📞." },
        { question: "Is delivery available everywhere?", answer: "We deliver to most areas in your city 🚚. Enter your address during checkout to confirm availability." },
        { question: "How do I track my order?", answer: "You can track your order in real-time using the 'Track' button in 'My Orders' page." },
        { question: "What payment methods are accepted?", answer: "We accept credit/debit cards, UPI, net banking, and cash on delivery 💳." },
        { question: "How can I contact customer support?", answer: "You can reach our support team through the Contact Us section, or email us at support@hungerhub.com 📧." },
        { question: "Can I schedule an order for later?", answer: "Yes! While checking out, you can choose a delivery time that suits you ⏰." },
        { question: "How are restaurants verified?", answer: "All partner restaurants are verified for licenses, hygiene, and safety before joining HungerHub ✅." },
        { question: "Do you provide discounts?", answer: "Yes 🎉. Check the Offers & Discounts section on the customer dashboard for ongoing deals." },
        { question: "How do I add items to my wishlist?", answer: "Simply click the ❤️ icon next to any food item and it will be saved in your Wishlist." },
        { question: "What if I receive the wrong order?", answer: "We’re sorry! Please report it via 'My Orders' → 'Report Issue' and our team will assist you quickly." },
    ];

    const handleQuestionClick = (faq) => {
        setChat((prev) => [...prev, { type: "question", text: faq.question }]);
        setChat((prev) => [...prev, { type: "answer", text: faq.answer }]);
    };

    return (
        <>
            {/* Floating Help Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition z-50"
            >
                <FaComments size={24} />
            </button>

            {/* Chat Modal */}
            {isOpen && (
                <div
                    className="fixed z-50 flex flex-col 
                     bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 
                     sm:bottom-0 sm:right-0 sm:w-full sm:h-full sm:rounded-none"
                >
                    {/* Header */}
                    <div className="bg-red-500 text-white p-3 flex justify-between items-center">
                        <h3 className="font-semibold">Need Help? 🤔</h3>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    {/* Chat Body */}
                    <div className="p-3 flex-1 max-h-64 overflow-y-auto sm:max-h-full">
                        {chat.map((msg, i) => (
                            <div
                                key={i}
                                className={`mb-2 p-2 rounded-lg text-sm ${msg.type === "question"
                                        ? "bg-red-100 text-right"
                                        : "bg-gray-100 text-left"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* FAQ Buttons */}
                    <div className="p-3 border-t border-gray-200 overflow-y-auto max-h-40 sm:max-h-60">
                        <p className="text-xs text-gray-500 mb-2">Quick Questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {faqs.map((faq, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuestionClick(faq)}
                                    className="bg-gray-200 text-xs px-2 py-1 rounded-lg hover:bg-gray-300 transition"
                                >
                                    {faq.question}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HelpChat;
