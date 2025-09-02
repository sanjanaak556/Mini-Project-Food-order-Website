import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://sanjanaak556.github.io/Food-API/data.json/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching product:", err)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!product) {
        return <p className="text-center text-gray-600">Product not found</p>
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <img
                src={product.image}
                alt={product.name}
                className="w-60 h-60 object-cover rounded-lg mb-6" />
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">₹{product.price}</p>
            <p className="max-w-xl text-gray-700 mb-6">{product.desc}</p>
            <p className='text-gray-600 mb-4'>{product.rating}</p>
            <p className='text-gray-600 mb-4'>{product.stock}</p>

            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
                Add to Cart
            </button>
        </div>
    )
}

export default ProductDetails
