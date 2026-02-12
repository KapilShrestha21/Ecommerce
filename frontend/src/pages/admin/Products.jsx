import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
} from "../../features/products/productAPI.js";

import ProductFormModal from "../../components/adminComponents/ProductFormModal.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const loadProducts = async () => {
    const { data } = await getProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Products
        </h1>

        <button
          onClick={() => {
            setEditProduct(null);
            setOpenForm(true);
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}

            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* IMAGE */}
                <td className="p-4">
                  <img
                    src={p.images?.[0]?.url}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover border"
                  />
                </td>

                {/* NAME */}
                <td className="p-4 font-medium">
                  {p.name}
                </td>

                {/* PRICE */}
                <td className="p-4">
                  ₹{p.price}
                </td>

                {/* CATEGORY */}
                <td className="p-4">
                  {p.category?.name || "—"}
                </td>

                {/* STOCK */}
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      p.countInStock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.countInStock}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4 text-right space-x-4">
                  <button
                    onClick={() => {
                      setEditProduct(p);
                      setOpenForm(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openForm && (
        <ProductFormModal
          close={() => setOpenForm(false)}
          editProduct={editProduct}
          refresh={loadProducts}
        />
      )}
    </div>
  );
}
