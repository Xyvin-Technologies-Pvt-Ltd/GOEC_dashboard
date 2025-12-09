import { Grid, Typography, Container, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledButton from "../../../ui/styledButton";
import InputField from "../../../ui/styledInput";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateChargingTariff, useEditChargingTariff } from "../../../hooks/mutations/useChargingTariffMutation";
import { useTaxDropdown } from "../../../hooks/queries/useTax";

export default function AddTariff({ action, data, onIsChange, isChange, updateData, setOpen }) {
  // Use TanStack Query hook for tax dropdown
  const { data: taxListData = [] } = useTaxDropdown();

  // Use TanStack Query mutation hooks
  const createMutation = useCreateChargingTariff({
    onSuccess: () => {
      toast.success("Charging Tariff created successfully", { position: "top-right" });
      onIsChange(!isChange);
      reset();
      updateData && updateData();
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong", { position: "top-right" });
    },
  });

  const editMutation = useEditChargingTariff({
    onSuccess: () => {
      toast.success("Charging Tariff updated successfully", { position: "top-right" });
      onIsChange(!isChange);
      reset();
      updateData && updateData();
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong", { position: "top-right" });
    },
  });

  const defaultValues = useMemo(() => {
    return action === "edit"
      ? {
          name: data?.Name,
          value: data?.Value,
          tax: { label: data?.taxData?.name, value: data?.Tax },
          serviceFee: data?.["Service fee(INR)"],
        }
      : {};
  }, [action, data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (formData) => {
    const addData = {
      name: formData.name,
      value: formData.value,
      tax: formData.tax.value,
      serviceAmount: formData.serviceFee,
    };
    if (action === "add") {
      createMutation.mutate(addData);
    } else if (action === "edit") {
      editMutation.mutate({ id: data._id, data: addData });
    }
  };

  // taxListData is already in the format { label, value } from the query hook
  const options = taxListData;

  return (
    <TableContainer>
      <Container fixed>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Name</Typography>
              <InputField placeholder={"Enter Name"} {...register("name")} />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Value (per kWH)</Typography>
              <InputField placeholder={"Enter Value"} {...register("value")} />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>TAX</Typography>
              <Controller
                name="tax"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledSelectField {...field} options={options} placeholder="None" />
                    {errors.tax && (
                      <span style={errorMessageStyle}>{errors.tax.message}</span>
                    )}
                  </>
                )}
                rules={{ required: "Tax is required" }}
              />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Service fee</Typography>
              <InputField placeholder={"Enter Amount"} {...register("serviceFee")} />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <StyledButton variant={"secondary"} width="103" onClick={handleCancel}>
                  Cancel
                </StyledButton>
                <StyledButton variant={"primary"} type="submit" width="160">
                  Save
                </StyledButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </TableContainer>
  );
}

//! STYLINGS

// Styled table container
export const TableContainer = styled.div`
  background: #27292f; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
`;

const errorMessageStyle = {
  color: "red",
};
