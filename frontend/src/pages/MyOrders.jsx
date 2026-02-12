import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrdersThunk } from "../features/order/orderThunks";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, [dispatch]);

  return (
    <div>
      <h2>My Orders</h2>

      {myOrders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total: Rs {order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
