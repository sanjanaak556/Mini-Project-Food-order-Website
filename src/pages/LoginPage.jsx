import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Pre-created admin (only one allowed)
const ADMIN = {
    email: "admin@hungerhub.com",
    username: "admin",
    password: "admin123",
    role: "admin",
};

function LoginPage() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false); // toggle login/signup
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: "customer",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save user in localStorage
    const saveUser = (user) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    };

    // Find user from localStorage
    const findUser = (username, password, role) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find(
            (u) => u.username === username && u.password === password && u.role === role
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (isSignUp) {
            // Validation for sign up
            if (!formData.fullName || !formData.email || !formData.username || !formData.password) {
                setError("⚠️ All fields are required for Sign Up");
                return;
            }

            if (!formData.email.includes("@")) {
                setError("⚠️ Please enter a valid email");
                return;
            }

            if (formData.role === "admin") {
                setError("❌ You cannot sign up as Admin. Only pre-created admin exists.");
                return;
            }

            // Save user
            saveUser(formData);
            alert("✅ Sign Up successful! Please log in now.");
            setIsSignUp(false);
            setFormData({
                fullName: "",
                email: "",
                username: "",
                password: "",
                role: "customer",
            });
        } else {
            // LOGIN
            if (!formData.username || !formData.password) {
                setError("⚠️ Username and Password are required to log in");
                return;
            }

            // Admin check
            if (
                formData.username === ADMIN.username &&
                formData.password === ADMIN.password &&
                formData.email === ADMIN.email &&
                formData.role === "admin"
            ) {
                navigate("/admin");
                return;
            }

            // Other users check
            const user = findUser(formData.username, formData.password, formData.role);
            if (user) {
                // Force correct panel redirection
                if (user.role === "customer") navigate("/customer");
                else if (user.role === "seller") navigate("/seller");
            } else {
                setError("❌ Invalid credentials. Please check your details.");
            }
        }
    };

    return (
        <div className="h-screen w-screen relative">
            {/* Background Image */}
            <img
                src="/images/bg-8.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Form Container */}
            <div className="relative flex items-center justify-center h-full px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-md z-10"
                >
                    <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
                        {isSignUp ? "Sign Up" : "Login"}
                    </h2>

                    {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                    {isSignUp && (
                        <>
                            {/* Full Name */}
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />

                            {/* Email */}
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </>
                    )}

                    {/* Username */}
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />

                    {/* Password */}
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />

                    {/* Role Selection */}
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>

                    {/* Toggle login/signup */}
                    <p className="text-center mt-4 text-sm">
                        {isSignUp ? "Already have an account?" : "New here?"}{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError("");
                            }}
                            className="text-red-500 font-semibold"
                        >
                            {isSignUp ? "Login" : "Sign Up"}
                        </button>
                    </p>

                    {/* Back to Landing Page */}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full bg-gray-200 mt-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        ⬅ Back to Home
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;


