import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import themeReducer from "./ThemeSlice"
import ordersReducer from "./OrdersSlice"
import wishlistReducer from "./WishlistSlice"
import offersReducer from "./offersSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        theme: themeReducer,
        orders: ordersReducer,
        wishlist: wishlistReducer,
        offers: offersReducer,
    }
})