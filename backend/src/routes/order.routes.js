import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
  getOrderById
} from "../controllers/order.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// USER
router.route("/").post(verifyJWT, createOrder);
router.route("/my").get(verifyJWT, getMyOrders);
router.route("/:id").get(verifyJWT, getOrderById);

// ADMIN
router.route("/").get(verifyJWT, isAdmin, getAllOrders);
router.route("/:id").put(verifyJWT, isAdmin, updateOrderStatus);
router.route("/:id").delete(verifyJWT, isAdmin, deleteOrder);


export default router;
