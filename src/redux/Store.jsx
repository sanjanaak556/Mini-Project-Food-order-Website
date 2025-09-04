import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import themeReducer from "./ThemeSlice"
import ordersReducer from "./OrdersSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        theme: themeReducer,
        orders:ordersReducer,
    }
})