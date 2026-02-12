import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth)

  // not logged in
  if (!user) return <Navigate to="/login" replace />

  // logged in but not admin
  if (user.role !== "admin") return <Navigate to="/" replace />

  return <Outlet />
}

export default AdminRoute
