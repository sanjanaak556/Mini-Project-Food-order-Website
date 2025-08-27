import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogOutButton() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/")
    }

    return (
        <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'>
            Logout
        </button>
    )
}

export default LogOutButton