// may be used for admin/moderator rules

import { useUserContext } from "context/userContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

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