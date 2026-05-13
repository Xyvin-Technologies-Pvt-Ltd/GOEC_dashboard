import * as React from "react";
import { cn } from "@/lib/utils";

const StyledInput = React.forwardRef(
  ({ icon, iconright, placeholder, lineHeight, specialAlign, className, ...props }, ref) => (
    <div
      className={cn(
        "relative flex w-full items-center gap-2 rounded border border-white/20 bg-[var(--inner)] p-4",
        className,
      )}
    >
      {icon && <span className="flex size-6 shrink-0 items-center justify-center text-[#87898e]">{icon}</span>}
      <input
        ref={ref}
        autoComplete="off"
        placeholder={placeholder}
        className={cn(
          "h-4 min-w-[60px] w-full border-0 bg-[var(--inner)] font-sans text-sm font-normal text-white outline-none placeholder:text-[#b5b8c5] focus:ring-0",
          specialAlign && "placeholder:absolute placeholder:left-0 placeholder:top-0 placeholder:m-0",
        )}
        style={{ lineHeight: lineHeight || "16px" }}
        {...props}
      />
      {iconright && (
        <span className="flex size-6 shrink-0 items-center justify-center text-[#87898e]">{iconright}</span>
      )}
    </div>
  ),
);
StyledInput.displayName = "StyledInput";

export default StyledInput;
