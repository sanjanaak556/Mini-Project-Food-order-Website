import { createSlice } from "@reduxjs/toolkit";

// Load orders from localStorage
const loadOrders = () => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : [];
};

// Save orders to localStorage
const saveOrders = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: loadOrders(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      saveOrders(state.orders);
    },
    cancelOrder: (state, action) => {
      const id = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = "Cancelled";
      saveOrders(state.orders);
    },
    rejectOrder: (state, action) => {
      const orderData = action.payload;
      state.orders.push({ ...orderData, status: "Rejected" });
      saveOrders(state.orders);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = status;
      saveOrders(state.orders);
    },
  },
});

export const { addOrder, cancelOrder, rejectOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;





