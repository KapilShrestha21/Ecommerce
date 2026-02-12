import { useEffect, useState } from "react";
import { getProducts } from "../features/products/productAPI";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="px-40 py-10">
      {/* Centered Heading */}
      <h2 className="text-2xl font-light text-center m-10">
        Browse All
      </h2>

      {/* Responsive 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}

        {products.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p.slug}`}
            className="cursor-pointer overflow-hidden hover:shadow-md transition"
          >
            {/* Product Image */}
            <img
              src={p.images?.[0]?.url || "/placeholder.png"}
              alt={p.name}
              className=" w-full h-68 object-cover"
            />

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-sm font-medium mb-1">
                {p.name}
              </h3>

              {p.countInStock > 0 ? (
                <p className="font-semibold text-gray-800">
                  ₹{p.price} NPR
                </p>
              ) : (
                <p className="font-semibold text-red-500">
                  Sold Out
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
