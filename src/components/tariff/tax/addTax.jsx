import { Grid, Typography, Container, Stack } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import StyledButton from "../../../ui/StyledButton";
import StyledSwitch from "../../../ui/StyledSwitch";
import { Controller, useForm } from "react-hook-form";
import { useCreateTax, useEditTax } from "../../../hooks/mutations/useTaxMutation";
import { toast } from "react-toastify";
import { TableContainer } from "../../common/FilterPrimitives";
import { FormField } from "../../forms";

export default function AddTax({ action, data, onIsChange, isChange, setOpen }) {
  const createTaxMutation = useCreateTax();
  const editTaxMutation = useEditTax();

  const defaultValues = useMemo(() => {
    return action === "edit"
      ? {
          name: data.Name,
          percentage: data.Description,
          status: data.Status ==='Active'
        }
      : { status: true };
  }, [action, data]);

  const { handleSubmit, control, reset } = useForm({ defaultValues });

  useEffect(() => {
    if (action === "edit") {
      reset(defaultValues);
    }
  }, [action, defaultValues, reset]);

  const handleCancel = ()=>{
    setOpen(false);
    reset();
  }

  const onSubmit = async (formData) => {
    try {
      if (action === "add") {
        await createTaxMutation.mutateAsync(formData);
      } else {
        await editTaxMutation.mutateAsync({ id: data._id, data: formData });
      }
      toast.success(`Tax ${action === "add" ? "created" : "updated"} successfully`, { position: "top-right" });
      onIsChange(!isChange);
      reset();
    } catch (error) {
      toast.error("Something went wrong", { position: "top-right" });
    }
  };

  return (
    <TableContainer>
      <Container fixed>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <FormField
                control={control}
                name="name"
                label="Name"
                placeholder="Enter Name"
                rules={{ required: "Name is required" }}
              />
            </Grid>
            <Grid item md={12}>
              <FormField
                control={control}
                name="percentage"
                label="Percentage (per kWH)"
                placeholder="Enter Percentage"
                rules={{ required: "Percentage is required" }}
              />
            </Grid>
            <Grid sx={{ marginBottom: 1, marginTop: 3 }} item xs={12} md={12}>
              <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Typography>Activate Tax</Typography>
                <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <StyledSwitch
                  onChange={(e) => field.onChange(e.target.checked)}
                  defaultChecked={field.value}
                  />
                )}
              />
              </Stack>
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

