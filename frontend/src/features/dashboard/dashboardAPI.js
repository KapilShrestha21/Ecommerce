import API from "../../utils/axios";

// Fetch admin dashboard stats
export const fetchDashboardStats = () => API.get("/admin/dashboard");
