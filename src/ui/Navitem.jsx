import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem, Stack } from "@mui/material";
import { ReactComponent as ArrowDropdown } from "../assets/icons/arrow_drop_down.svg";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme/tokens";

export const NavItem = (props) => {
  const { href, icon, title, sub, extendable, active, indexChange, ...others } = props;
  const navigate = useNavigate();
  let activeIndex = -1;
  let activ = active;
  sub &&
    sub.forEach((element, ind) => {
      if (
        window.location.pathname.substring(1, window.location.pathname.length) ===
        element.href
      ) {
        activeIndex = ind;
        activ = true;
      }
    });

  return (
    <ListItem
      disableGutters
      sx={{ display: "flex", flexDirection: "column", py: 0 }}
      {...others}
    >
      <Button
        component="a"
        startIcon={icon}
        endIcon={extendable ? <ArrowDropdown style={{ fill: "#fff" }} /> : <></>}
        disableRipple
        onClick={() => {
          if (!extendable) {
            navigate(`/${href}`);
          } else if (active && typeof indexChange === "function") {
            indexChange();
          }
        }}
        sx={{
          backgroundColor: activ && "secondary.contrast",
          borderRadius: 0,
          minHeight: tokens.layout.touchTargetMin,
          color: activ ? "#FFF" : "secondary.contrastText",
          fontWeight: 500,
          justifyContent: "flex-start",
          px: 3,
          py: 1.5,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: activ ? "secondary.main" : "neutral.400",
          },
          "&:hover": { backgroundColor: "rgba(255,255,255, 0.08)" },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
      <Collapse
        in={activ && extendable}
        sx={{ backgroundColor: activ && "secondary.contrast", width: "100%" }}
      >
        <Stack
          sx={{
            mx: 3,
            my: 1.5,
            ml: 4,
            pl: 1.25,
            borderLeft: "1px solid",
            borderColor: "secondary.button",
          }}
        >
          {activ &&
            sub &&
            sub.map((item, index) => (
              <Button
                key={index}
                sx={{
                  backgroundColor:
                    activeIndex === index ? "secondary.button" : "secondary.contrast",
                  borderRadius: 0.5,
                  minHeight: 40,
                  my: 0.5,
                  px: 2,
                  justifyContent: "flex-start",
                  color: activ ? "#fff" : "primary.contrastText",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(255,255,255, 0.1)" },
                }}
                onClick={() => navigate(`/${item.href}`)}
              >
                {item.title}
              </Button>
            ))}
        </Stack>
      </Collapse>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  sub: PropTypes.array,
};
