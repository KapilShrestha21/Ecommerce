import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { myOrders } = useSelector((state) => state.orders);

  if (!myOrders.length) {
    return <p className="text-center mt-10">You have no orders yet.</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p><span className="font-semibold">Order ID:</span> {order._id}</p>
              <p><span className="font-semibold">Total:</span> ₹{order.totalPrice}</p>
              <p><span className="font-semibold">Status:</span> {order.status}</p>
            </div>
            <Link
              to={`/order/${order._id}`}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
