import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import adminReducer from "../features/admin/adminSlice";
// import categoryReducer from "../features/categories/categorySlice"; 
// import orderReducer from "../features/orders/orderSlice"; 

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  dashboard: dashboardReducer,
  admin: adminReducer,
});

export default rootReducer;
