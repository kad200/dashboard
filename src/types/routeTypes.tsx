// may be used for admin/moderator rules



import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoutes = () => {
  let isAuthenticated = localStorage.getItem("isAuthenticated");

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export { ProtectedRoutes, PublicRoutes };