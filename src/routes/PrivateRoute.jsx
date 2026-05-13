import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";
import StyledLoader from "../ui/StyledLoader";

const PrivateRoute = ({ element, requiredPermission }) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (isLoading) {
    return <StyledLoader />;
  }

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default PrivateRoute;
