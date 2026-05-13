import React from "react";
import { cn } from "@/lib/utils";

const StyledWarning = ({ icon, value, className }) => (
  <div className={cn("flex items-center gap-2", className)}>
    {icon && <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>}
    <h1 className="text-cms text-sm font-normal">{value}</h1>
  </div>
);

export default StyledWarning;
