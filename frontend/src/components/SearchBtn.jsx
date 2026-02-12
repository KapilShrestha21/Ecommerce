import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import API from "../utils/axios"; // your axios instance
import { useNavigate } from "react-router-dom";

export default function SearchPopup() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("/products"); // GET all products
        setProducts(data.data); // depends on your API structure
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchProducts();
  }, [open]);

  // Filter products based on query
  const filteredProducts = query
    ? products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Handle product click
  const handleProductClick = (slug) => {
    setOpen(false); // close search popup
    navigate(`/product/${slug}`); // navigate to ProductDetail page
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-xl cursor-pointer">
        <IoMdSearch />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="flex items-center border-b pb-3 mb-6">
              <IoMdSearch className="text-xl text-gray-400 mr-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full outline-none text-sm"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto">
              {loading && (
                <p className="text-sm text-gray-500 text-center">Loading...</p>
              )}

              {!loading && query && filteredProducts.length === 0 && (
                <p className="text-sm text-gray-500 text-center">No results found</p>
              )}

              {!loading &&
                filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleProductClick(item.slug)} // navigate on click
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer rounded transition"
                  >
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="w-14 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{item.discountPrice || item.price} NPR
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
