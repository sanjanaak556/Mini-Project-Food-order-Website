import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "customer"
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Role-based navigation
        if (formData.role === "seller") {
            navigate("/seller")
        }
        else if (formData.role === "customer") {
            navigate("/customer")
        }
        else if (formData.role === "admin") {
            navigate("/admin")
        }
    }

    return (
        <div className="h-screen w-screen relative">
            {/* Background Image */}
            <img
                src="/images/bg-8.jpg" // replace with your image path
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Optional overlay to darken the background */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Login Form */}
            <div className="relative flex items-center justify-center h-full">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 shadow-2xl p-8 rounded-2xl w-96 z-10"
                >
                    <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
                        Login
                    </h2>

                    {/* Username */}
                    <label>Username</label><br />
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400' />

                    {/* Password */}
                    <label>Password</label><br />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400' />

                    {/* Role selection */}
                    <label>Role</label><br />
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className='w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400'>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Submit */}
                    <button
                        type='submit'
                        className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage