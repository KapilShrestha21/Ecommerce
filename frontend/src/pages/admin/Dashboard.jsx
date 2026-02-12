import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashStatsCard from "../../components/adminComponents/DashStatsCard";
import { getDashboardData } from "../../features/dashboard/dashboardThunk";
import { fetchDashboardStats } from "../../features/dashboard/dashboardAPI";

console.log(fetchDashboardStats);

export default function Dashboard() {
  const dispatch = useDispatch();
  const { totalProducts, totalCategories, totalOrders, recentOrders, isLoading, error } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (isLoading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashStatsCard title="Total Products" value={totalProducts} />
        <DashStatsCard title="Total Categories" value={totalCategories} />
        <DashStatsCard title="Total Orders" value={totalOrders} />
      </div>

      <div className="mt-6 bg-white p-6 shadow rounded">
        <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Customer</th>
                <th className="px-4 py-2 text-left text-gray-600">Total</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2">#{order._id.slice(-6)}</td>
                    <td className="px-4 py-2">{order.user.name}</td>
                    <td className="px-4 py-2">₹{order.totalPrice}</td>
                    <td className="px-4 py-2">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
