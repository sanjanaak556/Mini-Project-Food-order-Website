import React, { useState } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Ravi's Kitchen",
      role: "Partner Restaurant",
      feedback:
        "HungerHub boosted our sales by 40%! The platform is easy to use and helps us reach more customers daily.",
      rating: 5,
      img: "/images/Rest-1.jpg",
    },
    {
      name: "Anjali Sharma",
      role: "Customer",
      feedback:
        "The food always arrives hot and fresh 🍲. The ordering process is super smooth. Highly recommend!",
      rating: 5,
      img: "/images/test-1.jpg",
    },
    {
      name: "Tandoori Treats",
      role: "Partner Restaurant",
      feedback:
        "Partnering with HungerHub was the best decision! Fast payouts and excellent customer reach.",
      rating: 4,
      img: "/images/Rest-2.jpg",
    },
    {
      name: "Arun Kumar",
      role: "Customer",
      feedback:
        "Great variety of restaurants to choose from 😍. Love the offers and discounts too!",
      rating: 5,
      img: "/images/test-2.jpg",
    },
    {
      name: "Spice Junction",
      role: "Partner Restaurant",
      feedback:
        "The platform provides real-time order tracking and great support. Business is growing steadily 📈.",
      rating: 4,
      img: "/images/Rest-3.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    role: "Customer",
    feedback: "",
    rating: 0,
    img: null,
  });

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } }, // tablets
      { breakpoint: 640, settings: { slidesToShow: 1 } }, // mobile
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.feedback || formData.rating === 0) {
      alert("Please fill all fields and select a rating ⭐");
      return;
    }

    const newReview = {
      ...formData,
      img: formData.img || "/images/default-user.png", // uploaded or fallback
    };

    setTestimonials([...testimonials, newReview]);

    setFormData({
      name: "",
      role: "Customer",
      feedback: "",
      rating: 0,
      img: null,
    });

    alert("Thank you for your feedback! 🎉");
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, img: imgUrl });
    }
  };

  return (
    <div className="w-full px-6 py-12 bg-gray-50">
      {/* Carousel */}
      <h2 className="text-3xl font-bold text-center mb-8 text-red-500">
        What Our Partners & Customers Say 💬
      </h2>

      <Slider {...settings}>
        {testimonials.map((t, index) => (
          <div key={index} className="px-3">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center h-full">
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-red-400"
              />
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{t.role}</p>
              <p className="text-gray-700 text-sm italic mb-4">“{t.feedback}”</p>
              <div className="flex justify-center text-yellow-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Add Your Review Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-center text-green-600">
          ✍️ Add Your Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg px-3 py-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="Customer">Customer</option>
            <option value="Partner Restaurant">Partner Restaurant</option>
          </select>

          <textarea
            placeholder="Write your feedback..."
            className="w-full border rounded-lg px-3 py-2"
            value={formData.feedback}
            onChange={(e) =>
              setFormData({ ...formData, feedback: e.target.value })
            }
            required
          ></textarea>

          {/* Rating Selection */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Your Rating:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`cursor-pointer ${formData.rating > i ? "text-yellow-400" : "text-gray-300"
                  }`}
                onClick={() => setFormData({ ...formData, rating: i + 1 })}
              />
            ))}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">
              Upload Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full border rounded-lg px-3 py-2"
            />
            {formData.img && (
              <img
                src={formData.img}
                alt="Preview"
                className="mt-3 h-20 w-20 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default TestimonialsSection;


