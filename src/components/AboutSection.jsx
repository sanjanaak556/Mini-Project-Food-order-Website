import React from "react";
import { FaMobileAlt, FaClock, FaUtensils, FaSmile } from "react-icons/fa";

function AboutSection() {
  return (
    <section className="relative py-16 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            About <span className="text-gray-800">HungerHub</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            HungerHub is your one-stop destination for delicious food delivered fast and fresh. 
            We connect you with your favorite restaurants, amazing deals, and a hassle-free ordering experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <FaUtensils className="text-red-500 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Wide Variety</h3>
            <p className="text-gray-600 text-sm">
              Explore a diverse menu of cuisines from top-rated restaurants near you.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <FaClock className="text-red-500 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Get your favorite meals delivered hot and fresh, right to your doorstep.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <FaMobileAlt className="text-red-500 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Ordering</h3>
            <p className="text-gray-600 text-sm">
              Simple and intuitive interface to browse, search, and order in seconds.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <FaSmile className="text-red-500 text-4xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Great Offers</h3>
            <p className="text-gray-600 text-sm">
              Enjoy exciting discounts and deals every time you order with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
