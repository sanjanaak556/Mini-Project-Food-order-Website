import React, { useState } from 'react'
import { FaArrowLeft, FaUser } from "react-icons/fa"
import { useLocation, useNavigate } from 'react-router-dom'
import ThemeToggleIcon from './ThemeToggleIcon'

function Topbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const path = location.pathname

    const handleLogout = () => {
        navigate("/")
    }

    return (
        <div className='flex justify-end items-center bg-gray-100 p-4 shadow gap-4'>
            <ThemeToggleIcon />
            <div className='relative'>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className='w-10 h-10 rounded-full bg-red-500 flex items-center justify-center'>
                    <FaUser />
                </button>

                {dropdownOpen && (
                    <div className='absolue right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-2'>
                        <p className='px-2 py-1'>{path === "/seller" ? "Seller" : "Admin"}</p>
                        <button onClick={handleLogout} className='w-full text-left px-2 py-1 text-black hover:bg-red-500 rounded-xl'>
                            <FaArrowLeft /> Logout</button>
                    </div>
                )}

            </div>

        </div>
    )
}

export default Topbar