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
          className="rounded bg-surface-iconbutton text-foreground hover:bg-surface-iconbutton/90"
          aria-label="Open filters"
        >
          <OutlineIcon className="text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-border bg-background text-foreground">
        <SheetHeader className="border-b border-white/10 bg-card p-4 text-left">
          <SheetTitle className="text-muted-foreground">{title}</SheetTitle>
        </SheetHeader>
        <div className="p-2">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
