import { Box, Dialog, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import StyledDivider from "../../../../ui/styledDivider";
import StyledInput from "../../../../ui/styledInput";
import { ReactComponent as Close } from "../../../../assets/icons/close-icon-large.svg";
import StyledButton from "../../../../ui/styledButton";
import { Controller, useForm } from "react-hook-form";
import { useCreateOem, useEditOem } from "../../../../hooks/mutations/useEvMachineMutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "../../../../utils/DialogAnimation";

export default function AddOEM({ open, onClose, editStatus = false, editData = {} }) {
  const { handleSubmit, setValue, reset, formState: { errors }, control } = useForm();
  const createMutation = useCreateOem();
  const editMutation = useEditOem();
  useEffect(() => {
    setValue("name", editStatus ? editData["Company Name"] : '')
  }, [editData, editStatus, setValue])

  const onSubmit = (data) => {
    if (editStatus) {
      updateOEM(data)
    } else {
      createOEM(data)
    }

  };

  const createOEM = (data) => {
    createMutation.mutate(data, {
      onSuccess: (res) => {
        toast.success("OEM created successfully");
        onClose && onClose();
        reset();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Failed to create OEM");
      }
    })
  }



  const updateOEM = (data) => {
    editMutation.mutate({ id: editData._id, data }, {
      onSuccess: (res) => {
        toast.success("OEM Updated successfully");
        onClose && onClose();
        reset();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Failed to update OEM");
      }
    })
  }

  return (
    <Dialog open={open} fullWidth TransitionComponent={Transition}>
      <Box sx={{ backgroundColor: "primary.main" }}>
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
              {editStatus ? "Edit" : "Add"} OEM
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
                  {editStatus ? 'Edit' : 'Add'} Charger OEM
                </Typography>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledInput {...field} placeholder="Enter OEM" />
                      {errors.name && (
                        <span style={{ color: 'red' }}>
                          {errors.name.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "OEM is required" }}
                />

              </Stack>
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "end",
              px: 2,
              py: 2,
              alignItems: "center",
              backgroundColor: "secondary.main",
            }}
            spacing={2}
          >
            <StyledButton
              variant="secondary"
              type="button"
              style={{ width: "140px", height: "45px" }}
              onClick={() => {
                onClose && onClose();
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton
              variant="primary"
              type="submit"
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
