import { useEffect, useState } from "react";
import {
  getAllCategories,
  deleteCategory,
} from "../../features/categories/categoryAPI";

import CategoryFormModal from "../../components/adminComponents/CategoryFormModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <button
          onClick={() => {
            setEditCategory(null);
            setOpen(true);
          }}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg w-full md:w-auto"
        >
          + Add Category
        </button>
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No categories found
        </div>
      )}

      {/* GRID CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div className="w-full h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden">
              {cat.image?.url ? (
                <img
                  src={cat.image.url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  No image
                </span>
              )}
            </div>

            {/* NAME */}
            <h3 className="font-medium text-center mb-3">
              {cat.name}
            </h3>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditCategory(cat);
                  setOpen(true);
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <CategoryFormModal
          close={() => setOpen(false)}
          editCategory={editCategory}
          refresh={loadCategories}
        />
      )}
    </div>
  );
}
