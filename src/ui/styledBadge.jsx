import * as React from "react";
import { cn } from "@/lib/utils";

const StyledBadge = React.forwardRef(({ color, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "min-w-20 rounded-full px-5 py-1.5 text-base font-bold uppercase text-white shadow-md transition-all duration-300",
      color === "red" && "bg-destructive/40",
      color === "yellow" && "bg-warning/40",
      color === "gray" && "bg-muted-foreground/20",
      color === "green" && "bg-success/20",
      (!color || color === "default") && "bg-warning",
      className,
    )}
    {...props}
  />
));
StyledBadge.displayName = "StyledBadge";

export default StyledBadge;
