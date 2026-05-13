import * as React from "react";
import { cn } from "@/lib/utils";

const StyledBadge = React.forwardRef(({ color, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "min-w-[80px] rounded-[30px] px-5 py-1.5 text-base font-bold uppercase text-white shadow-md transition-all duration-300",
      color === "red" && "bg-[#551d1d]",
      color === "yellow" && "bg-[#6d5414]",
      color === "gray" && "bg-[rgba(181,184,197,0.2)]",
      color === "green" && "bg-[rgba(39,174,96,0.2)]",
      !color || color === "default" ? "bg-[#DAA520]" : "",
      className,
    )}
    {...props}
  />
));
StyledBadge.displayName = "StyledBadge";

export default StyledBadge;
