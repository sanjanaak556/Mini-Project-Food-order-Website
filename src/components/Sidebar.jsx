import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation()

    //   for determining currenty path
    const path = location.pathname

    // conditional rendering of sidebar items
    let sideItems

    if (path === "/seller") {
        // seller layout sidebar
        sideItems = (
            <>
                <Link to="/seller" className='text-black font-semibold hover:text-red-600 py-3'>
                    Dashboard
                </Link>
                <Link to="/seller/menu" className='text-black font-semibold hover:text-red-600 py-3'>
                    Menu
                </Link>
                <Link to="/seller/orders" className='text-black font-semibold hover:text-red-600 py-3'>
                    Orders
                </Link>
                <Link to="/seller/discounts" className='text-black font-semibold hover:text-red-600 py-3'>
                    Discounts
                </Link>
                <Link to="/seller/offers" className='text-black font-semibold hover:text-red-600 py-3'>
                    Offers
                </Link>
                <Link to="/seller/reviews" className='text-black font-semibold hover:text-red-600 py-3'>
                    Reviews
                </Link>
                <Link to="/seller/notifications" className='text-black font-semibold hover:text-red-600 py-3'>
                    Notifications
                </Link>
            </>
        )
    } else if (path === "/admin") {
        // admin layout sidebar
        sideItems = (
            <>
                <Link to="/admin" className='text-black font-semibold hover:text-red-600 py-3'>
                    Dashboard
                </Link>
                <Link to="/admin/users" className='text-black font-semibold hover:text-red-600 py-3'>
                    Users
                </Link>
                <Link to="/admin/sellers" className='text-black font-semibold hover:text-red-600 py-3'>
                    Sellers
                </Link>
                <Link to="/admin/menu" className='text-black font-semibold hover:text-red-600 py-3'>
                    Menu
                </Link>
                <Link to="/admin/orders" className='text-black font-semibold hover:text-red-600 py-3'>
                    Orders
                </Link>
                <Link to="/admin/reports" className='text-black font-semibold hover:text-red-600 py-3'>
                    Reports
                </Link>
                <Link to="/admin/reviews" className='text-black font-semibold hover:text-red-600 py-3'>
                    Reviews
                </Link>
            </>
        )
    }

    return (
        <div className='h-screen w-64 bg-white shadow-2xl rounded-2xl text-red-500 flex flex-col fixed left-0 top-0 p-6'>
            <nav className='flex flex-col'>
                <h2 className='text-2xl font-bold mb-8'>{path === "/seller" ? "Seller" : "Admin"}</h2>

                {/* Render sidebar items */}
                {sideItems}
            </nav>
        </div>
    )
}

export default Sidebar