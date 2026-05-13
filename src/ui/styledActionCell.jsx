import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StyledActionCell = ({ actions, onCliked }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <MoreVertical className="size-5" />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem] border-border bg-black text-white">
        {actions.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer focus:bg-zinc-800 focus:text-white"
            onClick={() => {
              onCliked?.({ index, action: item });
              setOpen(false);
            }}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StyledActionCell;
