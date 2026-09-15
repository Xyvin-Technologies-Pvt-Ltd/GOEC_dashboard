import { Box, Dialog, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledDivider from "../../../../../ui/styledDivider";
import StyledSelectField from "../../../../../ui/styledSelectField";
import { ReactComponent as Close } from "../../../../../assets/icons/close-icon-large.svg";
import StyledButton from "../../../../../ui/styledButton";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "../../../../../utils/DialogAnimation";
import { useChargingTariffDropdown } from "../../../../../hooks/queries/useChargingTariff";
import { useChangeEvTariff } from "../../../../../hooks/mutations/useEvMachineMutation";

export default function AssignTarrif({ open, onClose, CPID, updated }) {
  const { handleSubmit, reset, formState: { errors }, control } = useForm();
  
  // Use TanStack Query hook for charging tariff dropdown
  const { data: tarrifList = [] } = useChargingTariffDropdown();
  
  // Use TanStack Query mutation hook for changing EV tariff
  const changeEVTariffMutation = useChangeEvTariff({
    onSuccess: () => {
      toast.success("Tariff successfully assigned", { position: "top-right" });
      updated && updated();
      onClose && onClose();
      reset();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  const onSubmit = (data) => {
    changeEVTariffMutation.mutate({
      evMachine: CPID,
      data: { chargingTariff: data.chargingTariff.value },
    });
  };


  return (
    <Dialog open={open} fullWidth TransitionComponent={Transition} PaperProps={{ sx: { backgroundColor: "secondary.main" } }}>
      <Box sx={{ backgroundColor: "secondary.main" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              px: 2,
              py: 2,
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "secondary.contrastText" }} variant="h6">
              Assign Tariff
            </Typography>
            <Close
              style={{ cursor: "pointer" }}
              onClick={() => {
                onClose && onClose();
                reset()
              }}
            />
          </Stack>
          <StyledDivider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={1} p={2}>
                <Typography variant="subtitle2" color={"primary.contrastText"}>
                  Assign New Tariff Name
                </Typography>
                <Controller
                  name="chargingTariff"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField {...field} placeholder="select Tarrif" options={tarrifList} maxMenuHeight={100} />
                      {errors.chargingTariff && (
                        <span style={{ color: 'red' }}>
                          {errors.chargingTariff.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Select Charging tarrif" }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "end",
              px: 2,
              pt: 6,
              pb: 2,
              alignItems: "center",
            }}
            spacing={2}
          >
            <StyledButton
              type="submit"
              variant="primary"
              style={{ width: "140px", height: "45px" }}
            >
              Save
            </StyledButton>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}
