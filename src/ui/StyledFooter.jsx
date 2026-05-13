import React from "react";
import { cn } from "@/lib/utils";

const StyledFooter = ({ children, width, className }) => (
  <div
    className={cn(
      "flex items-center justify-end rounded-b-md bg-card p-5",
      width != null ? "" : "max-w-[772px]",
      className,
    )}
    style={width != null ? { width: `${width}%` } : undefined}
  >
    {children}
  </div>
);

export default StyledFooter;
