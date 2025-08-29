import React from 'react'

function Navbar() {
    return (
        <nav className='flex justify-between items-center px-6 py-4 top-0 w-full z-50'>
            {/* Logo + Name */}
            <div className='flex gap-3'>
                <img src="" alt="Logo" className='w-10 h-10' />
                <h1 className='text-2xl font-bold text-red-500'>FoodieHub</h1>
            </div>

            {/* Login button */}
            <a href="/login"
                className='text-red-500 px-4 py-2 hover:text-red-600 transition'>
                Login
            </a>
        </nav>
    )
}

export default Navbar
