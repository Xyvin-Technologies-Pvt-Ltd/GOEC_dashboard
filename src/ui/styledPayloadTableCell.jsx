import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function StyledPayloadTableCell({ value, command, sourceData }) {
  const [open, setOpen] = useState(false);

  if (value == null) {
    return null;
  }

  let StringValue = "";
  if (typeof value === "object") {
    StringValue = JSON.stringify(value, null, 2);
  } else {
    StringValue = String(value);
  }

  const textColor =
    sourceData === "CMS" ? "#EB5757" : sourceData === "CP" ? "#219653" : "#b5b8c5";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton className="max-h-[80vh] max-w-lg overflow-y-auto border-border bg-[#1c1d22]">
          <DialogHeader>
            <DialogTitle className="text-left text-[#b5b8c5]">{command}</DialogTitle>
          </DialogHeader>
          <Separator className="bg-white/20" />
          <pre
            className="max-h-[50vh] overflow-auto p-2 text-sm"
            style={{ color: textColor }}
          >
            {StringValue}
          </pre>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col">
        <span>{`${StringValue.substring(0, 25)}........`}</span>
        <Button
          type="button"
          variant="link"
          className="h-auto justify-start px-0 text-[#2D9CDB]"
          onClick={() => setOpen(true)}
        >
          Show more
        </Button>
      </div>
    </>
  );
}
