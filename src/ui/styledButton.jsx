import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** Maps legacy StyledButton API to shadcn Button + Tailwind. */
const StyledButton = React.forwardRef(
  (
    {
      variant = "primary",
      width,
      height,
      fontSize,
      p,
      pt,
      pr,
      pb,
      pl,
      m,
      mt,
      mr,
      mb,
      ml,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const toCssLen = (v) => (typeof v === "number" ? `${v}px` : v);

    const paddingStyle = {};
    if (p != null) paddingStyle.padding = toCssLen(p);
    if (pt != null) paddingStyle.paddingTop = toCssLen(pt);
    if (pr != null) paddingStyle.paddingRight = toCssLen(pr);
    if (pb != null) paddingStyle.paddingBottom = toCssLen(pb);
    if (pl != null) paddingStyle.paddingLeft = toCssLen(pl);

    const marginStyle = {};
    if (m != null) marginStyle.margin = toCssLen(m);
    if (mt != null) marginStyle.marginTop = toCssLen(mt);
    if (mr != null) marginStyle.marginRight = toCssLen(mr);
    if (mb != null) marginStyle.marginBottom = toCssLen(mb);
    if (ml != null) marginStyle.marginLeft = toCssLen(ml);

    const sizeStyle = { width: width != null ? toCssLen(width) : "100%" };
    if (width == null) sizeStyle.maxWidth = "100%";
    if (height != null) sizeStyle.height = toCssLen(height);
    if (fontSize != null) sizeStyle.fontSize = toCssLen(fontSize);

    const shadcnVariant = variant === "primary" ? "gradient" : "secondary";

    return (
      <Button
        ref={ref}
        variant={shadcnVariant}
        className={cn(
          variant === "secondary" && "bg-secondary text-foreground shadow-md hover:bg-secondary/80",
          variant === "gray" && "bg-surface-alt text-foreground shadow-md hover:bg-surface-alt/90",
          className,
        )}
        style={{ ...sizeStyle, ...paddingStyle, ...marginStyle, ...style }}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
StyledButton.displayName = "StyledButton";

export default StyledButton;
