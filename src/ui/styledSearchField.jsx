import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function StyledSearchField({ placeholder, onChange, className, ...props }) {
  return (
    <div
      className={cn(
        "relative flex w-full min-w-[200px] items-center gap-2 rounded-md border border-white/20 bg-secondary py-2 pl-2 pr-4 md:min-w-[250px]",
        className,
      )}
    >
      <span className="flex size-6 items-center justify-center text-[#87898e]">
        <Search className="size-5" />
      </span>
      <input
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        className="mr-2 w-full border-0 bg-transparent font-sans text-xs text-white outline-none placeholder:text-[#b5b8c5] focus:ring-0"
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
