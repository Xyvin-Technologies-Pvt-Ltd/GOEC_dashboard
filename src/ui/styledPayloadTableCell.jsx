import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const sourceColorClass = (source) =>
  source === "CMS" ? "text-cms" : source === "CP" ? "text-cp" : "text-muted-foreground";

export default function StyledPayloadTableCell({ value, command, sourceData }) {
  const [open, setOpen] = useState(false);

  if (value == null) return null;

  const StringValue = typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="max-h-[80vh] max-w-lg overflow-y-auto border-border bg-card"
        >
          <DialogHeader>
            <DialogTitle className="text-left text-muted-foreground">{command}</DialogTitle>
          </DialogHeader>
          <Separator className="bg-white/20" />
          <pre className={cn("max-h-[50vh] overflow-auto p-2 text-sm", sourceColorClass(sourceData))}>
            {StringValue}
          </pre>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col">
        <span>{`${StringValue.substring(0, 25)}........`}</span>
        <Button
          type="button"
          variant="link"
          className="h-auto justify-start px-0 text-link"
          onClick={() => setOpen(true)}
        >
          Show more
        </Button>
      </div>
    </>
  );
}
