// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/CartSlice"; 
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
        <Link to="/customer">
        <button className="mt-6 text-white bg-green-500 hover:bg-green-600 rounded-md p-2">Go back to menu</button>
        </Link>
      <h1 className="text-2xl mt-10 text-center text-green-500 font-bold mb-20">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              {/* Left side */}
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-500">Price: ${item.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>

              {/* Right side buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
