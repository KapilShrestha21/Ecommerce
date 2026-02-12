import { Link } from "react-router-dom";
import { Home, Box, Layers, ShoppingCart } from "lucide-react";

export default function DashSidebar() {
  return (
    <div className="h-screen w-64 bg-white shadow-lg p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-8">Ladies Wear Admin</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Home className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/admin/products" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Box className="w-5 h-5" /> Products
        </Link>
        <Link to="/admin/categories" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Layers className="w-5 h-5" /> Categories
        </Link>
        <Link to="/admin/orders" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <ShoppingCart className="w-5 h-5" /> Orders
        </Link>
      </nav>
    </div>
  );
}
