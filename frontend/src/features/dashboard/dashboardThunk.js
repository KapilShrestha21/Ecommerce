import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardStats } from "./dashboardAPI";

// Thunk to fetch dashboard data
export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchDashboardStats();
      return res.data.data; // assuming API response has { data: { ... } }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data");
    }
  }
);
