import React from 'react'
import ImageCarousel from '../components/ImageCarousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


function LandingPage() {
    return (
        <div>
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
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                        Order Your Favorite Food Anytime!
                    </h1>
                    <p className="text-xl text-white mt-4 max-w-2xl">
                        Fast delivery, great taste, and best offers in town.
                    </p>
                </div>
            </div>

            {/* About Section */}
            <section className="px-10 py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-4">About Us</h2>
                <p>
                    Welcome to Hungerhub - your go-to food ordering website. We bring your favorite meals right to your doorstep.
                </p>
            </section>

            {/* Running Images */}
            <ImageCarousel />

            {/* Contact Section */}
            <section className="px-10 py-16 text-center bg-white">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p>Email: hungerhub@gmail.com</p>
                <p>Phone: +91 8500007891</p>
            </section>

            <Footer variant="home" />
        </div>
    )
}

export default LandingPage
