import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

export default function DashNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // unwrap to handle any errors
      navigate("/login"); // redirect to login page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      
      {/* Dashboard title / branding */}
      <div className="font-bold text-lg text-gray-800">Dashboard</div>

      {/* Admin info + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Admin</span>
        <button
          onClick={handleLogout}
          className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
