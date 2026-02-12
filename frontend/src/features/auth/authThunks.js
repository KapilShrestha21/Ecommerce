import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, logoutAPI } from "./authAPI";

// login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data); // returns { data: { user, accessToken, refreshToken }, ... }

      // Save tokens & user
      if (res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      return res.data; // return { user, accessToken, refreshToken }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// register thunk
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await registerAPI(data);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Register failed"
            )
        }
    }
)

// logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await logoutAPI();
            return res;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
)
