import { useState, useEffect } from "react";
import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";

import { NavItem } from "../ui/Navitem";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { siderbarListItems } from "../assets/json/sidebar";
import { useAuth } from "../core/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose, ...props }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { userCan } = useAuth();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  // Load sidebar items initially and on user permission changes
  useEffect(() => {
    const filterSidebarItems = () => {
      const updatedItems = siderbarListItems()
        .map((item) => ({
          ...item,
          sub: item.sub?.filter(
            (subItem) =>
              !subItem.requiredRoles ||
              subItem.requiredRoles.some((role) => userCan(role))
          ),
        }))
        .filter((item) => (item.sub ? item.sub.length > 0 : true));
      setFilteredItems(updatedItems);

      navigate(
        window.location.pathname === "" ||
          window.location.pathname === "/dashboard"
          ? updatedItems[0].extendable
            ? `/${updatedItems[0].sub[0]?.href}`
            : `/${updatedItems[0].href}`
          : `${window.location.pathname}`
      );
      // Check if the active index is still valid after filtering
      if (activeIndex >= updatedItems.length) {
        setActiveIndex(-1);
      }
    };

    filterSidebarItems();
  }, [activeIndex, navigate, userCan]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (index === activeIndex) {
      onClose(); // Close the sidebar on item click
    }
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
          width: 260,
          border: "none",
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={lgUp ? "permanent" : "temporary"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                borderRadius: 1,
                paddingBottom: 3,
              }}
            >
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
              <Typography color="inherit" variant="caption">
                version 2.0
              </Typography>
            </Box>
          </Box>
        </div>
        <Box
          sx={{
            flexGrow: 1,
            maxHeight: "calc(100vh - 15px)",
            overflowY: "auto",
          }}
        >
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
