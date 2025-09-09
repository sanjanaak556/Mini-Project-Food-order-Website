import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.cart.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    // 🔹 Added: increase quantity by 1
    increaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // 🔹 Added: decrease quantity by 1 (remove if qty goes 0)
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
      }
    },
    // Clear cart after order placed
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart, } = cartSlice.actions;
export default cartSlice.reducer;



