import { createSlice } from "@reduxjs/toolkit";

const offersSlice = createSlice({
  name: "offers",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchOffersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOffersSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchOffersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOffersStart, fetchOffersSuccess, fetchOffersFailure } =
  offersSlice.actions;

export default offersSlice.reducer;
