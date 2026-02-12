import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk, updateOrderStatusThunk, deleteOrderThunk } from "../../features/order/orderThunks";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatusThunk({ id, status }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteOrderThunk(id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">All Orders</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>₹ {order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => handleDelete(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
