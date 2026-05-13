import { Grow } from "@mui/material";
import React from "react";

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow direction="up" ref={ref} {...props} />;
  });