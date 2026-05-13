import * as React from "react";
import { ReactComponent as OutlineIcon } from "../assets/icons/AdjustmentsOutline.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function RightDrawer({ children, title = "Filter" }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded bg-[#322f3b] text-foreground hover:bg-[#322f3b]/90"
          aria-label="Open filters"
        >
          <OutlineIcon className="text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-border bg-[#27292f] text-foreground">
        <SheetHeader className="border-b border-white/10 bg-[#1c1d22] p-4 text-left">
          <SheetTitle className="text-[#b5b8c5]">{title}</SheetTitle>
        </SheetHeader>
        <div className="p-2">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
