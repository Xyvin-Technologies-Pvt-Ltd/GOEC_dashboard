import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Adjust the import path as necessary

const PrivateRoute = ({ element, requiredPermission }) => {
  const { user, userCan } = useAuth();
  if (!user) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" replace />;
  }

  

  if (requiredPermission && !userCan(requiredPermission)) {
    // Redirect to unauthorized if the user doesn't have the required permission
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authorized, render the element
  return element;
};

export default PrivateRoute;
