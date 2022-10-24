import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "context/userContext";

const AuthorizedRoutes = ({ allowedRoles }: any) => {
  const { role } = useUserContext();
  const location = useLocation();

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : role ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export { AuthorizedRoutes };
