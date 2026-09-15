import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store'; // Adjust the import path as necessary
import StyledLoader from '../../ui/styledLoader';

const PrivateRoute = ({ element, requiredPermission }) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasPermission = useAuthStore((state) => state.hasPermission);
  
  // Wait for auth status check to complete
  if (isLoading) {
    return <StyledLoader />;
  }
  
  if (!user || !isAuthenticated) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    // Redirect to unauthorized if the user doesn't have the required permission
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authorized, render the element
  return element;
};

export default PrivateRoute;
