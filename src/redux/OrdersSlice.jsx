import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    cancelOrder: (state, action) => {
      const id = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = "Cancelled";
      }
    },
    //  New reducer for auto-tracking
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const { addOrder, cancelOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;



