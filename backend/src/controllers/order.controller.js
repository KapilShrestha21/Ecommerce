import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* ======================================================
   @desc    Create Order
   @route   POST /api/v1/orders
   @access  Private
====================================================== */
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new ApiError(400, "No order items provided");
  }

  let itemsPrice = 0;

  const updatedItems = [];

  for (const item of orderItems) {

    const product = await Product.findById(item.product);
    if (!product) {
      throw new ApiError(404, `Product not found: ${item.product}`);
    }

    // Check stock
    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `${product.name} is out of stock`
      );
    }

    // Calculate real price
    itemsPrice += product.price * item.quantity;

    // Reduce stock
    product.stock -= item.quantity;
    await product.save();

    updatedItems.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0]?.url,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const shippingPrice = itemsPrice > 5000 ? 0 : 100;
  const totalPrice = itemsPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    orderItems: updatedItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

/* ======================================================
   @desc    Get all orders (Admin)
   @route   GET /api/v1/orders
   @access  Admin
====================================================== */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product", "name price images")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

/* ======================================================
   @desc    Update order status
   @route   PUT /api/v1/orders/:id
   @access  Admin
====================================================== */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = status;

  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order updated successfully"));
});

/* ======================================================
   @desc    Delete order
   @route   DELETE /api/v1/orders/:id
   @access  Admin
====================================================== */
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  await order.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Order deleted successfully"));
});

export const getMyOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product", "name images price")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders fetched"));
});

// @desc Get single order
// @route GET /api/v1/orders/:id
// @access Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  res.status(200).json(
    new ApiResponse(200, order, "Order fetched")
  );
});
