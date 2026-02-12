import { useEffect, useState } from "react";
import { getAllCategories } from "../../features/categories/categoryAPI";
import { createProduct, updateProduct } from "../../features/products/productApi";

createProduct
export default function ProductFormModal({ close, editProduct, refresh }) {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || "",
    category: editProduct?.category?._id || "",
    countInStock: editProduct?.countInStock || 0,
    discountPrice: editProduct?.discountPrice || "",
    isFeatured: editProduct?.isFeatured || false,
  });

  // ================= VARIANTS STATE =================
  const [variants, setVariants] = useState(editProduct?.variants || []);

  const addVariant = () => setVariants([...variants, { size: "", stock: 0 }]);
  const updateVariant = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
  };
  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const loadCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);

      if (!editProduct && data.length > 0) {
        setForm((prev) => ({ ...prev, category: data[0]._id }));
      }
    };
    loadCategories();
  }, [editProduct]);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You must be logged in as admin to create a product.");
      return;
    }
    
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));

      if (image) fd.append("images", image);

      if (variants.length > 0) fd.append("variants", JSON.stringify(variants));

      if (editProduct) {
        await updateProduct(editProduct._id, fd);
      } else {
        await createProduct(fd);
      }

      refresh();
      close();
    } catch (err) {
      console.error("PRODUCT SAVE ERROR 👉", err);
      alert(
        "Product save failed.\n\nMake sure:\n• Description ≥ 3 characters\n• Image is selected\n• Variants are valid\n• You are logged in as admin"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[450px] shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editProduct ? "Edit Product" : "Add Product"}
        </h2>

        {/* NAME */}
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          className="border p-2 w-full mb-3 rounded"
          rows="3"
          placeholder="Description (min 3 characters)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        {/* PRICE */}
        <input
          type="number"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        {/* DISCOUNT PRICE */}
        <input
          type="number"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Discount Price (optional)"
          value={form.discountPrice}
          onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
        />

        {/* CATEGORY */}
        <select
          className="border p-2 w-full mb-3 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* PRODUCT-LEVEL STOCK */}
        <input
          type="number"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Stock (optional if using variants)"
          value={form.countInStock}
          onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
        />

        {/* FEATURED */}
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            className="mr-2"
          />
          Featured Product
        </label>

        {/* ================= VARIANTS ================= */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Variants (Size & Stock)</h3>

          {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <select
                value={variant.size}
                onChange={(e) => updateVariant(index, "size", e.target.value)}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Size</option>
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                value={variant.stock}
                onChange={(e) => updateVariant(index, "stock", Number(e.target.value))}
                placeholder="Stock"
                className="border p-2 rounded w-20"
                required
              />

              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500 px-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Add Variant
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700 mb-1 block">
            Product Image
          </span>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V12M7 12V8M7 12h4m6 4V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h3"
                  />
                </svg>

                <p className="text-sm text-gray-500">
                  {image ? image.name : "Click to upload image"}
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
        </label>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="h-24 w-24 object-cover rounded border mb-4"
          />
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="border px-3 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
