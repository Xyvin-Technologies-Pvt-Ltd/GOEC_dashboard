import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl px-4 text-center">
      <div className="my-12 flex flex-col items-center gap-4">
        <ErrorOutlineIcon style={{ fontSize: 80, color: "red" }} />
        <h1 className="text-3xl font-bold text-foreground">404: Page Not Found</h1>
        <p className="text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
        <Button onClick={handleBack}>Go Back Home</Button>
      </div>
    </div>
  );
}
