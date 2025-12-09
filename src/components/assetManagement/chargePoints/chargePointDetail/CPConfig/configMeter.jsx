import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledButton from "../../../../../ui/styledButton";
import StyledSelectField from "../../../../../ui/styledSelectField";
import { Clear } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useChangeConfiguration } from "../../../../../hooks/mutations/useOcppMutation";

const ChipBox = ({ label, onDelete }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "secondary.lightGray",
        alignItems: "center",
        px: 2,
        py: 1,
        borderRadius: "20px",
        justifyContent: "space-between",
      }}
    >
      <Typography>{label}</Typography>
      <Clear sx={{ fontSize: "20px", cursor: "pointer" }} onClick={onDelete} />
    </Stack>
  );
};

export default function ConfigMeter({ title, selectData, chipData, ...props }) {
  const measurandOptions = [
    { title: "Current.Export" },
    { title: "Current.Import" },
    { title: "Current.Offered" },
    { title: "Energy.Active.Export.Register" },
    { title: "Energy.Active.Import.Register" },
    { title: "Energy.Reactive.Export.Register" },
    { title: "Energy.Reactive.Import.Register" },
    { title: "Energy.Active.Export.Interval" },
    { title: "Energy.Active.Import.Interval" },
    { title: "Energy.Reactive.Export.Interval" },
    { title: "Energy.Reactive.Import.Interval" },
    { title: "Frequency" },
    { title: "Power.Active.Export" },
    { title: "Power.Active.Import" },
    { title: "Power.Factor" },
    { title: "Power.Offered" },
    { title: "Power.Reactive.Export" },
    { title: "Power.Reactive.Import" },
    { title: "RPM" },
    { title: "SoC" },
    { title: "Temperature" },
    { title: "Voltage" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [chips, setChips] = useState(chipData);

  // TanStack Query mutation hook
  const { mutate: updateConfiguration, isPending: isUpdating } = useChangeConfiguration({
    onSuccess: (res) => {
      if (res.status) {
        toast.success("Configuration updated successfully!");
        const cpid = sessionStorage.getItem("cpid");
        const newChips = [...chips, ...selectedOptions];
        setChips(newChips);
        setSelectedOptions([]);
      }
    },
    onError: (error) => {
      toast.error("Failed to update configuration.");
    },
  });

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected.map((option) => option.value));
  };

  const handleChipDelete = (index) => {
    const newChipData = [...chips];
    newChipData.splice(index, 1);
    setChips(newChipData);
  };

  const handleSave = () => {
    const cpid = sessionStorage.getItem("cpid");
    const newChips = [...chips, ...selectedOptions];

    updateConfiguration({
      cpid,
      data: {
        key: title,
        value: newChips.join(","),
      },
    });
  };

  const filteredOptions = measurandOptions.filter(
    (option) => !chips.includes(option.title)
  );

  return (
    <Box sx={{ backgroundColor: "primary.grey", p: 2 }}>
      <Stack direction="column" spacing={1}>
        <Typography>{title}</Typography>
        <Stack direction="row" spacing={3} sx={{ p: 3 }}>
          <StyledSelectField
            isMulti
            placeholder="Select"
            options={filteredOptions.map((option) => ({
              label: option.title,
              value: option.title,
            }))}
            value={selectedOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            onChange={handleSelectChange}
          />
          <StyledButton
            onClick={handleSave}
            style={{
              backgroundColor: "#0047C2",
              color: "#fff",
              width: "150px",
            }}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </StyledButton>
        </Stack>
        <Grid container spacing={2}>
          {chips.map((item, index) => (
            <Grid item key={index} md={1.7}>
              <ChipBox label={item} onDelete={() => handleChipDelete(index)} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
