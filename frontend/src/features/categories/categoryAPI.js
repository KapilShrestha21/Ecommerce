import API from "../../utils/axios";

export const getAllCategories = async () => {
  const { data } = await API.get("/categories");
  return data.data;
};

export const createCategory = async (formData) => {
  const { data } = await API.post(
    "/categories",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return data.data;
}

export const updateCategory = async (id, formData) => {
  const res = await API.put(`/categories/${id}`, formData);
  return res.data;
};

export const deleteCategory = async (id) => {
  const { data } = await API.delete(`/categories/${id}`);
  return data.data;
}