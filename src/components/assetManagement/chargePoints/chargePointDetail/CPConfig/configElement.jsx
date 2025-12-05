import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledInput from "../../../../../ui/styledInput";
import StyledButton from "../../../../../ui/styledButton";
import { toast } from "react-toastify";
import { useChangeConfiguration } from "../../../../../hooks/mutations/useOcppMutation";

export default function ConfigElement({ label, data, ...props }) {
  const [inputValue, setInputValue] = useState(data);
  const [loading, setLoading] = useState(false);

  const changeConfigurationMutation = useChangeConfiguration({
    onSuccess: (res) => {
      if (res.status) {
        toast.success("Configuration updated successfully!");
        setLoading(false);
      }
    },
    onError: (error) => {
      toast.error("Failed to update configuration.");
      setLoading(false);
    },
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    const cpid = sessionStorage.getItem("cpid");
    changeConfigurationMutation.mutate({
      cpid,
      data: {
        key: label,
        value: inputValue,
      },
    });
  };

  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "space-between", alignItems: "center" }}
      {...props}
    >
      <Typography>{label}</Typography>
      <Stack direction={"row"} spacing={1}>
        <Button
          sx={{
            backgroundColor: "secondary.button",
            color: "primary.DimText",
            width: "150px",
          }}
        >
          {data && data}
        </Button>
        <StyledInput
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: "150px", textAlign: "center" }}
        />
        <StyledButton
          onClick={handleSave}
          style={{ backgroundColor: "#0047C2", color: "#fffc", width: "150px" }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </StyledButton>
      </Stack>
    </Stack>
  );
}
