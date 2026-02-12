import API from "../../utils/axios";

export const getOrders = () =>
  API.get("/orders");

export const updateOrderStatus = (id, data) =>
  API.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);

export const createOrder = (data) =>
  API.post("/orders", data);

export const getMyOrders = () =>
  API.get("/orders/my");

export const getOrderById = (id) =>
  API.get(`/orders/${id}`);
