
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const restoreAuthState = async () => {
      const token = localStorage.getItem('token');
      // Simulate async operation, e.g., decoding the token
      if (token) {
        // Set user state based on token
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    };

    restoreAuthState();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }


  const getLoginUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return undefined;
        // Handle token decoding errors or invalid token here
      }
    }
    return undefined
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const userCan = (requiredRole) => {
    return getLoginUser()?.role?.permissions?.includes(requiredRole);
  };

  const userHave = (locationAllowed) => {
    return getLoginUser()?.role?.location_access?.includes(locationAllowed);
  };

  return (
    <AuthContext.Provider value={{ user: getLoginUser(), userCan, userHave, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
