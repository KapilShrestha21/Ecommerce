import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../features/products/productApi"; // make sure the file casing is correct!
import { useDispatch, useSelector } from "react-redux";
import { addToCart, openCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const { slug } = useParams(); // must match route: /products/:slug
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart.items);

    const [product, setProduct] = useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const cartQty = cart.find(item => item._id === product._id)?.qty || 0;

    // =================== FETCH PRODUCT ===================
    useEffect(() => {
        if (!slug) return; // prevent undefined

        const fetchProduct = async () => {
            try {
                const { data } = await getProductBySlug(slug);
                setProduct(data.data); // data structure from your API
            } catch (err) {
                console.error("Failed to fetch product:", err);
                toast.error("Product not found");
            }
        };

        fetchProduct();
    }, [slug]);

    if (!product) {
        return <p className="text-center py-20 text-gray-500">Loading...</p>;
    }

    // =================== ADD TO CART ===================
    const handleClick = () => {

        if (!isAuthenticated || !user) {
            toast.error("You must be signed in to add products to cart!");
            return;
        }

        const stock = Number(product.countInStock);
        const quantity = Number(qty);

        if (qty + cartQty > product.countInStock) {
            toast.error(`Only ${product.countInStock} items available`);
            return;
        }


        if (stock === 0) {
            toast.error("Out of stock!");
            return;
        }

        if (quantity > stock) {
            toast.error(`Only ${stock} items available`);
            return;
        }

        if (product.countInStock === 0) {
            toast.error("Out of stock!")
            return;
        }

        // If product has variants, make sure user selected one
        if (product.variants?.length > 0 && !selectedVariant) {
            toast.error("Please select a size");
            return;
        }

        dispatch(
            addToCart({
                _id: product._id,
                name: product.name,
                price: product.discountPrice || product.price,
                image: product.images[0]?.url,
                qty,
                countInStock: product.countInStock,
                variant: selectedVariant || null,
            })
        );

        dispatch(openCart());
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white px-6 py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
                {/* ========== LEFT: IMAGES ========== */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <img
                            src={product.images[mainImageIndex]?.url}
                            alt={product.name}
                            className="w-full h-[650px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMainImageIndex(idx)}
                                className={`border ${mainImageIndex === idx ? "border-black" : "border-gray-200 opacity-40"}`}
                            >
                                <img src={img.url} alt={`thumb-${idx}`} className="w-20 h-28 object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* ========== RIGHT: INFO ========== */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-light">{product.name}</h1>
                        <p className="text-sm text-gray-500 mt-1">{product.category?.name}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-2xl font-light">₹{product.discountPrice || product.price} NPR</p>
                        {product.discountPrice && <p className="text-gray-400 line-through">₹{product.price}</p>}
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>

                    {/* ========== VARIANTS ========== */}
                    {product.variants?.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium mb-2">
                                Select Size <span className="text-red-500">*</span>
                            </h3>
                            <div className="flex gap-3 flex-wrap">
                                {product.variants.map((variant, idx) => {
                                    const isSelected = selectedVariant?.size === variant.size;
                                    const isOut = variant.stock === 0;
                                    return (
                                        <button
                                            key={idx}
                                            disabled={isOut}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`w-12 h-12 border text-sm flex items-center justify-center ${isOut
                                                ? "border-gray-300 text-gray-400 line-through cursor-not-allowed"
                                                : isSelected
                                                    ? "border-black bg-black text-white"
                                                    : "border-gray-300 hover:border-black"
                                                }`}
                                        >
                                            {variant.size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ========== QTY + ADD TO CART ========== */}
                    <div className="flex items-center gap-6">
                        <div>
                            <label className="block text-xs mb-1">QTY</label>
                            <input
                                type="number"
                                min="1"
                                max={product.countInStock}
                                value={qty}
                                onChange={(e) =>
                                    setQty(Math.min(product.countInStock, Math.max(1, Number(e.target.value))))
                                }
                                className="w-20 border px-3 py-2 text-center"
                            />
                        </div>
                        <button
                            onClick={handleClick}
                            disabled={!isAuthenticated || product.countInStock === 0 || qty + cartQty > product.countInStock}
                            className={`cursor-pointer flex-1 py-3 mt-4 tracking-wide
        ${!isAuthenticated || product.countInStock === 0 || qty + cartQty > product.countInStock
                                    ? "bg-gray-900 text-white cursor-not-allowed"
                                    : added
                                        ? "bg-gray-900 text-white"
                                        : "bg-black text-white hover:opacity-90"
                                }`}
                        >
                            {!isAuthenticated
                                ? "Sign in to add"
                                : product.countInStock === 0
                                    ? "Out of stock"
                                    : qty + cartQty > product.countInStock
                                        ? "No more stock"
                                        : added
                                            ? "Added"
                                            : "ADD TO CART"
                            }
                        </button>


                    </div>

                    <p className="text-xs text-gray-500">
                        {product.countInStock > 0 ? `${product.countInStock} items in stock` : "Out of stock"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
