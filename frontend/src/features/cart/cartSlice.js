import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i._id === item._id
      );

      if (existingItem) {
        existingItem.qty = Math.min(
          existingItem.qty + item.qty,
          item.countInStock
        );
      } else {
        state.items.push(item);
      }

      state.isCartOpen = true;
    },

    clearCart: (state) => {
      state.items = [];
      state.isCartOpen = false;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },

    openCart: (state) => {
      state.isCartOpen = true;
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item && qty > 0) {
        item.qty = qty;
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.qty < item.countInStock) {
        item.qty += 1;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter(
            (i) => i._id !== action.payload
          );
        }
      }
    },
  },
});

removeFromCart: (state, action) => {
  const id = action.payload;
  state.items = state.items.filter(item => item._id !== id);
}


export const {
  addToCart,
  clearCart,    
  removeFromCart,
  closeCart,
  openCart,
  updateQty,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
