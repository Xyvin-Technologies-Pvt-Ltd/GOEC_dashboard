import { useState, useEffect } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { NavItem } from "../ui/NavItem";
import { siderbarListItems } from "../assets/json/sidebar";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../assets/header-logo.png";
import { tokens } from "../theme/tokens";

const Sidebar = ({ open, onClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedItems = siderbarListItems()
      .map((item) => ({
        ...item,
        sub: item.sub?.filter(
          (subItem) =>
            !subItem.requiredRoles ||
            subItem.requiredRoles.some((role) => hasPermission(role)),
        ),
      }))
      .filter((item) => (item.sub ? item.sub.length > 0 : true));
    setFilteredItems(updatedItems);

    const pathWhenDashboard = updatedItems[0]?.extendable
      ? `/${updatedItems[0].sub[0]?.href}`
      : `/${updatedItems[0]?.href}`;
    const nextPath =
      window.location.pathname === "" || window.location.pathname === "/dashboard"
        ? pathWhenDashboard
        : `${window.location.pathname}`;
    navigate(nextPath);
    if (activeIndex >= updatedItems.length) {
      setActiveIndex(-1);
    }
  }, [activeIndex, navigate, hasPermission]);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          width: tokens.layout.sidebarWidth,
          border: "none",
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={lgUp ? "permanent" : "temporary"}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              alignItems: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              borderRadius: 1,
              pb: 3,
            }}
          >
            <img src={HeaderLogo} alt="Logo" className="w-2/5" />
          </Box>
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          {filteredItems.map((item, index) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              sub={item.sub}
              active={index === activeIndex}
              extendable={item.extendable}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
