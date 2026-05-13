import * as React from "react";
import { cn } from "@/lib/utils";

const StyledStopButton = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "ml-auto inline-flex cursor-pointer items-start gap-2.5 rounded border-0 bg-[#663131] px-5 py-2.5 text-center font-sans text-[11px] font-medium uppercase tracking-wide text-white hover:bg-[#a8322c]",
      className,
    )}
    {...props}
  >
    {children}
  </button>
));
StyledStopButton.displayName = "StyledStopButton";

export default StyledStopButton;
