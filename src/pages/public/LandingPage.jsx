import React from 'react'
import LandingNavbar from '../../components/navbars/LandingNavbar'
import ImageCarousel from '../../components/ImageCarousel'
import Footer from '../../components/Footer'

function LandingPage() {
    return (
        <div>
            <LandingNavbar />

            {/* Hero Section */}
            <div className='h-screen flex flex-col justify-center items-center text-center bg-cover bg-center'
                style={{ backgroundImage: "url('')" }}>
                <h1 className='text-5xl font-bold text-yellow-600 drop-shadow-lg'>
                    Order Your Favorite Food Anytime!
                </h1>
                <p className='text-xl text-gray-500 mt-4'>
                    Fast delivery, great taste, and best offers in town.
                </p>
            </div>

            {/* About Section */}
            <section className='px-10 py-16 bg-gray-100 text-center'>
                <h2 text-3xl font-bold mb-4>About Us</h2>
                <p>
                    Welcome to FoodieHub – your go-to food ordering website. We bring your favorite meals right to your doorstep.
                </p>
            </section>

            {/* Running Images */}
            <ImageCarousel />

            {/* Contact Section */}
            <section className='px-10 py-16 text-center bg-white'>
                <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
                <p>Email: foodiehub@gmail.com</p>
                <p>Phone: +91 8500007891</p>
            </section>

            <Footer />

        </div>
    )
}

export default LandingPage