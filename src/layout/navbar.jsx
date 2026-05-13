import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Notification } from "../assets/icons/notification.svg";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { useAuthStore } from "../store";
import { tokens } from "../theme/tokens";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border: "none",
  boxShadow: "none",
}));

export const DashboardNavbar = ({ onSideBarOpen, ...other }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <DashboardNavbarRoot
      sx={{
        left: { lg: tokens.layout.sidebarWidth },
        width: { lg: `calc(100% - ${tokens.layout.sidebarWidth}px)` },
        border: "none",
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: tokens.layout.navbarHeight,
          left: 0,
          px: { xs: 1.5, md: 2 },
        }}
      >
        <IconButton
          onClick={onSideBarOpen}
          sx={{ display: { xs: "inline-flex", lg: "none" } }}
          aria-label="Open navigation"
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ pr: { xs: 2, md: 3 } }}>
          <Notification />
        </Box>

        <Stack
          direction="row"
          spacing={{ xs: 2, md: 3 }}
          alignItems="center"
          sx={{ pr: { xs: 1, md: 2 }, mr: { xs: 1, md: 2 } }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              display: { xs: "none", sm: "block" },
            }}
            variant="subtitle2"
          >
            {user?.name || "Guest"}
          </Typography>

          <Tooltip title="Logout">
            <LogoutTwoToneIcon className="cursor-pointer" onClick={logout} />
          </Tooltip>
        </Stack>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};
