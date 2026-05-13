import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-center sm:px-6">
      <div className="my-12 flex flex-col items-center gap-4">
        <ErrorOutlineIcon className="text-destructive" sx={{ fontSize: 80 }} />
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">404: Page Not Found</h1>
        <p className="text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
    </div>
  );
}
