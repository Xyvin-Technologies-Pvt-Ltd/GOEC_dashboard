import * as React from "react";
import { cn } from "@/lib/utils";

const StyledTextArea = React.forwardRef(
  ({ icon, placeholder, lineHeight, specialAlign, className, ...props }, ref) => (
    <div
      className={cn(
        "relative flex w-full items-start gap-2 rounded border border-border bg-muted p-4",
        className,
      )}
    >
      {icon && <span className="flex size-6 shrink-0 items-center justify-center text-icon-muted">{icon}</span>}
      <textarea
        ref={ref}
        autoComplete="off"
        placeholder={placeholder}
        className={cn(
          "min-h-20 w-full resize-none border-0 bg-muted font-sans text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus:ring-0",
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
