import React, { useEffect } from "react";
import RouteRenderer from "./core/routes/route-renderer";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/index";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store";

export default function App() {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  // Initialize auth status on app load
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <ThemeProvider theme={theme}>
      <RouteRenderer />
      <ToastContainer autoClose={2000} position="bottom-right" />
    </ThemeProvider>
  );
}
