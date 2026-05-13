import * as React from "react";
import { cn } from "@/lib/utils";

const StyledTextArea = React.forwardRef(
  ({ icon, placeholder, lineHeight, specialAlign, className, ...props }, ref) => (
    <div
      className={cn(
        "relative flex w-full items-start gap-2 rounded border border-white/20 bg-[var(--inner)] p-4",
        className,
      )}
    >
      {icon && <span className="flex size-6 shrink-0 items-center justify-center text-[#87898e]">{icon}</span>}
      <textarea
        ref={ref}
        autoComplete="off"
        placeholder={placeholder}
        className={cn(
          "min-h-[80px] w-full resize-none border-0 bg-[var(--inner)] font-sans text-sm font-normal text-white outline-none placeholder:text-[#b5b8c5] focus:ring-0",
          specialAlign && "placeholder:absolute placeholder:left-0 placeholder:top-0 placeholder:m-0",
        )}
        style={{ lineHeight: lineHeight || "16px" }}
        {...props}
      />
    </div>
  ),
);
StyledTextArea.displayName = "StyledTextArea";

export default StyledTextArea;
