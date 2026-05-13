import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell as UiTableCell } from "@/components/ui/table";

export default function TableSkeleton({ tableHeader }) {
  return (
    <>
      {[...Array(5)].map((_, ind) => (
        <tr key={ind} className="border-b border-[#333]">
          {tableHeader.map((_data, index) => (
            <UiTableCell key={index} className="py-3">
              <Skeleton className="h-5 w-full bg-zinc-800" />
            </UiTableCell>
          ))}
        </tr>
      ))}
    </>
  );
}
