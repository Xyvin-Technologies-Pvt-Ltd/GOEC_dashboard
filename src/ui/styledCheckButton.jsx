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

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const next = !active;
          setActive(next);
          checkButtonChange?.({ active: next, value: children });
        }
      }}
      className={cn(
        "flex min-h-[60px] cursor-pointer items-center justify-center gap-2 rounded-md border border-white/20 px-16 py-8 text-base font-normal capitalize text-white transition-all duration-300",
        active ? "bg-[#4a4458] text-white" : "bg-[#2B2930] text-white",
        className,
      )}
      onClick={() => {
        const next = !active;
        setActive(next);
        checkButtonChange?.({ active: next, value: children });
      }}
      {...props}
    >
      {children}
      <span className="flex h-6 shrink-0 items-center justify-center pl-2.5 text-[#87898e]">
        {active ? <Close style={{ fontSize: "25px" }} /> : <Plus />}
      </span>
    </div>
  );
};

export default StyledCheckButton;
