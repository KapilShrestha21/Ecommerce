import { Outlet } from "react-router-dom";
import DashSidebar from "../components/adminComponents/DashSidebar";
import DashNavbar from "../components/adminComponents/DashNavbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <DashSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        
        {/* Top navbar */}
        <DashNavbar />

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
