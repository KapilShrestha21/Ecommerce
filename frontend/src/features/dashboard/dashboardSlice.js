import { createSlice } from "@reduxjs/toolkit";
import { getDashboardData } from "./dashboardThunk";

const initialState = {
  totalProducts: 0,
  totalCategories: 0,
  totalOrders: 0,
  recentOrders: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Loading state
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Success state
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalProducts = action.payload.totalProducts;
        state.totalCategories = action.payload.totalCategories;
        state.totalOrders = action.payload.totalOrders;
        state.recentOrders = action.payload.recentOrders;
      })
      // Error state
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
