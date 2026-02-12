import { useDispatch, useSelector } from "react-redux";
import {
  closeCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, isCartOpen } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    dispatch(closeCart());
    navigate("/checkout");
  };

  const handleViewCart = () => {
    dispatch(closeCart());
    navigate("/cart"); // create this page later if you don’t have it
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => dispatch(closeCart())}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#1c1c1c] text-white z-50
        transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-600">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={() => dispatch(closeCart())}>✕</button>
        </div>

        {/* CART ITEMS */}
        <div className="p-5 space-y-4 overflow-y-auto h-[70%]">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-sm">{item.name}</p>

                  <p className="text-xs text-gray-400">
                    ₹ {item.price}
                  </p>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item._id))}
                      className="w-7 h-7 border border-gray-600 text-sm"
                    >
                      −
                    </button>

                    <span className="w-6 text-center">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => {
                        if (item.qty >= item.countInStock) {
                          toast.error("Out of stock");
                          return;
                        }
                        dispatch(increaseQty(item._id));
                      }}
                      className={`w-7 h-7 border text-sm ${
                        item.qty >= item.countInStock
                          ? "border-gray-400 text-gray-400 cursor-not-allowed"
                          : "border-gray-600"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item._id));
                    toast.success("Removed from cart");
                  }}
                  className="text-red-400 text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-gray-600">
          <div className="flex justify-between mb-4 font-semibold">
            <span>SUBTOTAL</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleViewCart}
            className="w-full bg-gray-600 py-2 mb-2 hover:bg-gray-500 transition"
          >
            VIEW CART
          </button>

          <button
            onClick={handleCheckout}
            className="w-full bg-black py-2 hover:bg-gray-900 transition"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
