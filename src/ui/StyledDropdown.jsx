import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ReactComponent as OutlineIcon } from "../../assets/icons/AdjustmentsOutline.svg";

const StyledDropdown = ({ height, width, component, alignRight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center justify-center gap-2.5 rounded border border-black/20 bg-[#322f3b] px-5 py-4"
        onClick={handleTriggerClick}
      >
        <OutlineIcon />
      </button>
      <div
        className={cn(
          "absolute z-10 min-h-[200px] min-w-[200px] bg-[#322f3b] p-3 shadow-lg",
          isOpen ? "block" : "hidden",
          alignRight ? "right-0" : "left-0",
        )}
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        }}
      >
        {component}
      </div>
    </div>
  );
};

export default StyledDropdown;
