import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


function CustomerLayout() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default CustomerLayout