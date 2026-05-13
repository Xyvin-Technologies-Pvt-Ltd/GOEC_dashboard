import { styled } from "@mui/material";
import Sidebar from "./sidebar";
import { DashboardNavbar } from "./navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { registerChartJs } from "../utils/register-chart";
import { tokens } from "../theme/tokens";
import { LayoutProvider, useLayout } from "./LayoutContext";

registerChartJs();

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  padding: 0,
  margin: 0,
  paddingTop: tokens.layout.navbarHeight,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: tokens.layout.sidebarWidth,
  },
}));

const DashboardLayoutInner = ({ children }) => {
  const { isDrawerOpen, openDrawer, closeDrawer } = useLayout();
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            minWidth: 0,
          }}
        >
          {children ? children : <Outlet />}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSideBarOpen={openDrawer} />
      <Sidebar onClose={closeDrawer} open={isDrawerOpen} />
    </>
  );
};

const DashboardLayout = ({ children }) => (
  <LayoutProvider>
    <DashboardLayoutInner>{children}</DashboardLayoutInner>
  </LayoutProvider>
);

export default DashboardLayout;
