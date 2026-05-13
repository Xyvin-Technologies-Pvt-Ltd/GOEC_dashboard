import * as React from "react";
import { cn } from "@/lib/utils";

const StyledInput = React.forwardRef(
  ({ icon, iconright, placeholder, lineHeight, specialAlign, className, ...props }, ref) => (
    <div
      className={cn(
        "relative flex w-full items-center gap-2 rounded border border-border bg-muted p-4",
        className,
      )}
    >
      {icon && <span className="flex size-6 shrink-0 items-center justify-center text-icon-muted">{icon}</span>}
      <input
        ref={ref}
        autoComplete="off"
        placeholder={placeholder}
        className={cn(
          "h-4 w-full min-w-[60px] border-0 bg-muted font-sans text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus:ring-0",
          specialAlign && "placeholder:absolute placeholder:left-0 placeholder:top-0 placeholder:m-0",
        )}
        style={{ lineHeight: lineHeight || "16px" }}
        {...props}
      />
      {iconright && (
        <span className="flex size-6 shrink-0 items-center justify-center text-icon-muted">{iconright}</span>
      )}
    </div>
  ),
);
StyledInput.displayName = "StyledInput";

export default StyledInput;
