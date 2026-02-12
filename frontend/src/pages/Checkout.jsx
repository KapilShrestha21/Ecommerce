import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrderThunk } from "../features/order/orderThunks";
import { clearCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    country: "Nepal",
    paymentMethod: "eSewa",
  });

  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      orderItems: items.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.qty,
      })),
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        country: form.country,
      },
      paymentMethod: form.paymentMethod,
      totalPrice: itemsPrice,
    };

    dispatch(createOrderThunk(orderData)).then((res) => {
      if (!res.error) {
        dispatch(clearCart());
        navigate("/order-success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>

        {/* Shipping Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 md:col-span-2"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="eSewa">eSewa</option>
            <option value="Khalti">Khalti</option>
            <option value="Mobile Banking">Mobile Banking</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="border border-gray-200 rounded p-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <span>{item.name} x {item.qty}</span>
                <span>₹ {item.price * item.qty}</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹ {itemsPrice}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
