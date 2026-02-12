import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, clearCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center text-lg font-medium">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Your Cart</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Items list */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 rounded shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded"
              />

              <div className="flex-1 w-full">
                <p className="font-medium text-lg">{item.name}</p>
                <p className="text-gray-500 mt-1">₹ {item.price}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => dispatch(decreaseQty(item._id))}
                    className="w-8 h-8 border border-gray-400 rounded hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="px-2 text-center">{item.qty}</span>

                  <button
                    onClick={() => {
                      if (item.qty >= item.countInStock) {
                        toast.error("Out of stock");
                        return;
                      }
                      dispatch(increaseQty(item._id));
                    }}
                    className="w-8 h-8 border border-gray-400 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-600 hover:text-red-800 mt-2 sm:mt-0 sm:ml-4"
              >
                Clear All
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-80 bg-gray-100 p-4 rounded shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹ 0</span>
          </div>
          <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {subtotal}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
