import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import FoodCarousel from '../components/FoodCarousel'
import ContactSection from '../components/ContactSection'
import RestaurantCarousel from '../components/RestaurantCarousel'
import PartnerSection from '../components/PartnerSection'
import TestimonialsSection from '../components/TestimonialsSection'
import HelpChat from '../components/HelpChat'


function LandingPage() {
    return (
        <div>
            {/* hero section */}
            <div className="relative h-screen w-full overflow-hidden z-0">
                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/Fd-vid.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Navbar always on the top */}
                <Navbar />

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
                    <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg">
                        Order Your Favorite Food Anytime!
                    </h1>
                    <p className="text-xl font-semibold text-white mt-4 max-w-2xl">
                        Fast delivery, great taste, and best offers in town...
                    </p>
                </div>
            </div>

            {/* about Section */}
            <AboutSection />

            {/* Running Images */}
            <FoodCarousel />

            {/* Contact Section */}
            <ContactSection />

            {/* Restaurant carousel */}
            <RestaurantCarousel />

            {/* New Restaurant Registration form */}
            <PartnerSection />

            {/* Testimonial section */}
            <TestimonialsSection />

            {/* Help Chat */}
            <HelpChat />

            {/* footer */}
            <Footer variant="home" />
        </div>
    )
}

export default LandingPage
