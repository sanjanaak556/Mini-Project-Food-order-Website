import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [], // Start fresh, no localStorage persistence
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
    clearOrders: () => {
      return [];
    },
  },
});

export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;


