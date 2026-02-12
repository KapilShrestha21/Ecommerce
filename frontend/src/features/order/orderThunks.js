import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrders, getMyOrders  } from "./orderAPI"; // make sure orderAPI has getOrders for admin and getMyOrders for user

// ✅ Create order (user checkout)
export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await createOrder(orderData);
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create order");
    }
  }
);

// ✅ Get all orders (Admin)
export const getOrdersThunk = createAsyncThunk(
  "orders/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrders();
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// ✅ Get logged-in user orders
export const getMyOrdersThunk = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyOrders();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch your orders");
    }
  }
);

// ✅ Update order status (Admin)
export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateOrderStatus(id, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order");
    }
  }
);

// ✅ Delete order (Admin)
export const deleteOrderThunk = createAsyncThunk(
  "orders/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOrder(id);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete order");
    }
  }
);
