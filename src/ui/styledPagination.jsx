import React from "react";
import { cn } from "@/lib/utils";

const StyledPagination = ({ page, pageCount, onChange }) => (
  <div
    className={cn(
      "sticky bottom-0 left-0 my-4 flex items-center justify-center gap-2 font-sans text-xs font-normal tracking-wide text-muted-foreground",
    )}
  >
    <button
      type="button"
      className="min-w-[100px] cursor-pointer rounded border-0 bg-pagination-bg px-2 py-2 text-foreground hover:bg-pagination-bg-hover disabled:cursor-not-allowed disabled:bg-pagination-bg-disabled"
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
      className="min-w-[100px] cursor-pointer rounded border-0 bg-pagination-bg px-2 py-2 text-foreground hover:bg-pagination-bg-hover disabled:cursor-not-allowed disabled:bg-pagination-bg-disabled"
      onClick={() => onChange(page + 1)}
      disabled={page >= pageCount - 1}
    >
      Next
    </button>
  </div>
);

export default StyledPagination;
