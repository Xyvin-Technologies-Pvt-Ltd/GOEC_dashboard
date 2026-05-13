import React from "react";
import { cn } from "@/lib/utils";

const StyledPagination = ({ page, pageCount, onChange }) => (
  <div
    className={cn(
      "sticky bottom-0 left-0 my-4 flex items-center justify-center gap-2 font-sans text-xs font-normal tracking-wide text-[#b5b8c5]",
    )}
  >
    <button
      type="button"
      className="min-w-[100px] cursor-pointer rounded border-0 bg-[#333] px-2 py-2 text-white hover:bg-[#555] disabled:cursor-not-allowed disabled:bg-[#222]"
      onClick={() => onChange(page - 1)}
      disabled={page <= 0}
    >
      Previous
    </button>
    <span className="mx-2.5">
      Page {page + 1} of {pageCount}
    </span>
    <button
      type="button"
      className="min-w-[100px] cursor-pointer rounded border-0 bg-[#333] px-2 py-2 text-white hover:bg-[#555] disabled:cursor-not-allowed disabled:bg-[#222]"
      onClick={() => onChange(page + 1)}
      disabled={page >= pageCount - 1}
    >
      Next
    </button>
  </div>
);

export default StyledPagination;
