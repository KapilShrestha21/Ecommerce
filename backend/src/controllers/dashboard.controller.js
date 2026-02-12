// backend/src/controllers/dashboard.controller.js
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Order } from "../models/order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getDashboardStats = async (req, res) => {
  // Count products, categories, orders
  const totalProducts = await Product.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalOrders = await Order.countDocuments();

  // Get recent orders (last 5)
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name email")
    .populate("orderItems.product", "name price images");

  return res.status(200).json(
    new ApiResponse(200, {
      totalProducts,
      totalCategories,
      totalOrders,
      recentOrders,
    }, "Dashboard stats fetched successfully")
  );
};
