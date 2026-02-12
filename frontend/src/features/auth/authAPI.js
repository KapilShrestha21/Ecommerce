import API from "../../utils/axios";

// login api
export const loginAPI = async (data) => {
  const res = await API.post("/users/login", data);

  // Save admin/user token in localStorage
  if (res.data.token) {
    localStorage.setItem("adminToken", res.data.token);
  }

  return res.data;
};

// register api
export const registerAPI = async (data) => {
  const res = await API.post("/users/register", data, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
}

// logout api
export const logoutAPI = async () => {
  const res = await API.post("/users/logout");

  // Remove token from localStorage
  localStorage.removeItem("adminToken");

  return res.data;
};