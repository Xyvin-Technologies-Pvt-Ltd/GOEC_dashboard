import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import StyledInput from "../../../../../ui/styledInput";
import StyledDivider from "../../../../../ui/styledDivider";
import StyledButton from "../../../../../ui/styledButton";
import { useForm, Controller } from "react-hook-form";
import { useGetDiagnostics } from "../../../../../hooks/mutations/useOcppMutation";
import { toast } from "react-toastify";

export default function GetDiagnostics() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    const cpid = sessionStorage.getItem("cpid");
    getDiagnosticsMutation.mutate({ cpid, data });
  };

  const getDiagnosticsMutation = useGetDiagnostics({
    onSuccess: (res) => {
      if (res) {
        const successToastId = toast.success("GetDiagnostics Response fetched successfully", {
          position: "top-right",
        });
        toast.update(successToastId);
        reset();
      }
    },
    onError: (error) => {
      const msg = error?.response?.data?.error || error?.message || "Failed to get diagnostics";
      const errorToastId = toast.error(msg, { position: "top-right" });
      toast.update(errorToastId);
    },
  });

  return (
    <Box
      sx={{
        mx: { xs: 2, md: 25 },
        backgroundColor: "secondary.main",
        borderRadius: "4px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={5} sx={{ px: { xs: 2, md: 5 }, py: { xs: 2, md: 5 } }}>
          <Stack direction={"column"} spacing={1}>
            <Typography>Location</Typography>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput placeholder={"Change Location"} {...field} />
                  {errors.location && (
                    <span style={errorMessageStyle}>{errors.location.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Location is required" }}
            />
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography>Retries</Typography>
            <Controller
              name="retries"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput placeholder={"Change Retries"} {...field} />
                  {errors.retries && (
                    <span style={errorMessageStyle}>{errors.retries.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Retries is required" }}
            />
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography>Retry interval</Typography>
            <Controller
              name="retryInterval"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput placeholder={"Retry Interval"} {...field} />
                  {errors.retryInterval && (
                    <span style={errorMessageStyle}>{errors.retryInterval.message}</span>
                  )}
                </>
              )}
              rules={{ required: "Retry Interval is required" }}
            />
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack direction={"row"} sx={{ p: 2 }}>
          <Box sx={{ flexGrow: 1 }} />
          <StyledButton variant={"primary"} style={{ width: "160px" }} type="submit">
            Send
          </StyledButton>
        </Stack>
      </form>
    </Box>
  );
}

const errorMessageStyle = {
  color: "red",
  // margin: '1px 0',
};
