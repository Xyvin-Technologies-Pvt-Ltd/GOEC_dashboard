import { createContext, useContext, useState, useCallback } from "react";

const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);

  return (
    <LayoutContext.Provider
      value={{ isDrawerOpen, openDrawer, closeDrawer, toggleDrawer }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return ctx;
};
