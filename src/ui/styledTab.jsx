import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function StyledTab({ buttons, activeIndex = 0, onChanged, className, ...props }) {
  const [activeInd, setActiveInd] = useState(activeIndex);
  useEffect(() => {
    setActiveInd(activeIndex);
  }, [activeIndex]);

  return (
    <div
      className={cn(
        "flex flex-row justify-center bg-[#1c1d22] pl-2 md:justify-start",
        className,
      )}
      {...props}
    >
      {buttons.map((item, ind) => {
        const isActive = ind === activeInd;
        return (
          <button
            key={ind}
            type="button"
            className={cn(
              "h-[60px] border-0 border-b-2 border-transparent px-4 text-sm font-medium transition-colors",
              isActive
                ? "border-b-white bg-[#4a4458] text-[#f7f8fc]"
                : "text-[#b5b8c5] hover:bg-white/10",
            )}
            onClick={() => {
              setActiveInd(ind);
              onChanged?.({ index: ind, value: item });
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
