import React from "react";
import Slider from "react-slick";

function FoodCarousel() {
  const images = [
    "/images/bg-7.jpg",
    "/images/bg-8.jpg",
    "/images/bg-10.jpg",
    "/images/bg-11.jpg",
    "/images/bg-12.jpg",
    "/images/bg-13.jpg",
    "/images/bg-14.jpg",
    "/images/bg-15.jpg",
  ];

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablets & smaller laptops
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-500">
        Explore Delicious Varieties 🍴
      </h2>

      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="px-2">
            <img
              src={src}
              alt={`Food ${index + 1}`}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FoodCarousel;
