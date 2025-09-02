import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-white shadow rounded-lg text-center">
      <h3 className="font-bold">{product.name}</h3>
      <p>${product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
