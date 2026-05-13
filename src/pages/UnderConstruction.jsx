import React from "react";
import { CircularProgress } from "@mui/material";

export default function UnderConstruction() {
  return (
    <div className="mx-auto mt-12 max-w-md px-4 text-center sm:px-6">
      <div className="my-12 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Site Under Construction</h1>
        <p className="text-muted-foreground">
          We're working hard to improve our website and we'll be ready to launch soon.
        </p>
        <CircularProgress color="warning" sx={{ my: 2 }} />
        <p className="text-foreground">Thank you for your patience!</p>
      </div>
    </div>
  );
}
