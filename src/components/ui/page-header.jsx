import * as React from "react";
import { cn } from "@/lib/utils";

const PageHeader = React.forwardRef(
  ({ title, subtitle, actions, meta, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-center md:justify-between md:gap-6",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        {title && (
          <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {meta && <div className="text-xs text-muted-foreground">{meta}</div>}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 md:flex-nowrap md:justify-end">
          {actions}
        </div>
      )}
    </div>
  ),
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
