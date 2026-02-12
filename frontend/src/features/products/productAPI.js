import API from "../../utils/axios";

// Get token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Product APIs
export const getProducts = () => API.get("/products");

export const createProduct = (data) => {
  return API.post("/products", data, getAuthConfig());
};

export const updateProduct = (id, data) => {
  return API.put(`/products/${id}`, data, getAuthConfig());
};

export const deleteProduct = (id) => {
  return API.delete(`/products/id/${id}`, getAuthConfig());
};

export const getProductBySlug = (slug) => {
  return API.get(`/products/${slug}`);
};

export const getProductById = (id, data) => {
  return API.put(`/products/id/${id}`, data, getAuthConfig());
};
