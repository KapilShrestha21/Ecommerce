import API from "../../utils/axios"

export const createAdminAPI = (data) =>
  API.post("/admin/create", data)
