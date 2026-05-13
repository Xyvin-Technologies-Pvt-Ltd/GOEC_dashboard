import * as React from "react";
import { cn } from "@/lib/utils";

const PageContainer = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex w-full flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
PageContainer.displayName = "PageContainer";

export { PageContainer };
