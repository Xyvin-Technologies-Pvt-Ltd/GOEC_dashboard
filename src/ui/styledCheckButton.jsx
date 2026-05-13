import { useState } from "react";
import { cn } from "@/lib/utils";
import { ReactComponent as Close } from "../assets/icons/Light.svg";
import { ReactComponent as Plus } from "../assets/icons/Light-1.svg";

const StyledCheckButton = ({
  actived = false,
  icon,
  children,
  checkButtonChange,
  className,
  ...props
}) => {
  const [active, setActive] = useState(actived);

  const handleToggle = () => {
    const next = !active;
    setActive(next);
    checkButtonChange?.({ active: next, value: children });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      className={cn(
        "flex min-h-15 cursor-pointer items-center justify-center gap-2 rounded-md border border-border px-16 py-8 text-base font-normal capitalize text-foreground transition-all duration-300",
        active ? "bg-accent" : "bg-surface-card",
        className,
      )}
      onClick={handleToggle}
      {...props}
    >
      {children}
      <span className="flex h-6 shrink-0 items-center justify-center pl-2.5 text-icon-muted">
        {active ? <Close /> : <Plus />}
      </span>
    </div>
  );
};

export default StyledCheckButton;
