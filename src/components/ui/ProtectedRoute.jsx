import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProtectedRoute({ children, allowedRoles }) {
  const loading         = useAuthStore((state) => state.loading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user            = useAuthStore((state) => state.user);

  // wait for checkAuth to finish
  if (loading) return null;

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // wrong role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;