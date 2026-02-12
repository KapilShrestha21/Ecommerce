import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderThunk,
  getMyOrdersThunk,
  getOrdersThunk,
  updateOrderStatusThunk,
  deleteOrderThunk,
} from "./orderThunks";

const initialState = {
  orders: [],        // admin orders
  myOrders: [],      // user orders
  currentOrder: null,

  isLoading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {

    // ✅ CREATE ORDER
    builder.addCase(createOrderThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.currentOrder = action.payload;
    });

    builder.addCase(createOrderThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // ✅ MY ORDERS
    builder.addCase(getMyOrdersThunk.fulfilled, (state, action) => {
      state.myOrders = action.payload;
    });

    // ✅ ADMIN ORDERS
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });

    // ✅ UPDATE STATUS
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.orders = state.orders.map((order) =>
        order._id === updated._id ? updated : order
      );
    });

    // ✅ DELETE
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
