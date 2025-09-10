import React from "react";
import Slider from "react-slick";

function RestaurantCarousel() {
    const restaurants = [
        { id: 1, name: "Spicy Treats", image: "/images/Rest-1.jpg" },
        { id: 2, name: "Ocean Bites", image: "/images/Rest-2.jpg" },
        { id: 3, name: "Green Garden", image: "/images/Rest-3.jpg" },
        { id: 4, name: "Royal Feast", image: "/images/Rest-4.jpg" },
        { id: 5, name: "Urban Diner", image: "/images/Rest-5.jpg" },
        { id: 6, name: "Golden Spoon", image: "/images/Rest-6.jpg" },
        { id: 7, name: "Crispy Corner", image: "/images/Rest-7.jpg" },
        { id: 8, name: "Flavors of India", image: "/images/Rest-8.jpg" },
        { id: 9, name: "Tandoori Tales", image: "/images/Rest-9.jpg" },
        { id: 10, name: "Street Eats", image: "/images/Rest-10.jpg" },
        { id: 11, name: "Sweet Paradise", image: "/images/Rest-11.jpg" },
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
                breakpoint: 1024, // tablets
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
                Our Partner Restaurants 🍽️
            </h2>

            <Slider {...settings}>
                {restaurants.map((rest) => (
                    <div key={rest.id} className="px-2 relative">
                        {/* Image */}
                        <img
                            src={rest.image}
                            alt={rest.name}
                            className="rounded-xl shadow-lg w-full h-64 object-cover"
                        />
                        {/* Overlay name */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-lg font-semibold text-center py-2 rounded-b-xl">
                            {rest.name}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default RestaurantCarousel;
