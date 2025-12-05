import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import StyledSelectField from "../../../../../ui/styledSelectField";
import StyledDivider from "../../../../../ui/styledDivider";
import StyledButton from "../../../../../ui/styledButton";
import { useForm, Controller } from "react-hook-form";
import { useSendLocalList } from "../../../../../hooks/mutations/useOcppMutation";
import { toast } from "react-toastify";



export default function SendLocalList() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      version: "",
      updateType:""
    },
  });
  const onSubmit = async (formData) => {
    const data = {
      listVersion: formData.version.value,
      updateType: formData.updateType.value,
    };
    const cpid = sessionStorage.getItem("cpid");
    sendLocalListMutation.mutate({ cpid, data });
  };

  const sendLocalListMutation = useSendLocalList({
    onSuccess: (res) => {
      const msg = res?.message || "SendLocalList Response";
      const successToastId = toast.success(msg, { position: "top-right" });
      toast.update(successToastId);
      reset();
    },
    onError: (error) => {
      const msg = error?.response?.data?.error || error?.message || "Failed to send local list";
      const errorToastId = toast.error(msg, { position: "top-right" });
      toast.update(errorToastId);
    },
  });

  let version = [
    { label: "1.6", value: 1.6 },
    { label: "2.0", value: 2.0 },
  ];

  let updateType = [
    { label: "Differential", value: "Differential" },
    { label: "Full", value: "Full" },
  ];

  return (
    <Box
      sx={{
        mx: { xs: 2, md: 25 },
        backgroundColor: "secondary.main",
        borderRadius: "4px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={"column"}
          spacing={5}
          sx={{ px: { xs: 2, md: 5 }, py: { xs: 2, md: 5 } }}
        >
          <Stack direction={"column"} spacing={1}>
            <Typography>Version</Typography>

            <Controller
              name="version"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField 
                   {...field}
                   options={version}
                  placeholder={"Update Firmware"} />
                  {errors.version && (
                    <span style={errorMessageStyle}>
                      {errors.version.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Version is required" }}
            />
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography>Update Type</Typography>

            <Controller
              name="updateType"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    options={updateType}
                     placeholder={"Select"} />
                  {errors.updateType && (
                    <span style={errorMessageStyle}>
                      {errors.updateType.message}
                    </span>
                  )}
                </>
              )}
            />
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack direction={"row"} sx={{ p: 2 }}>
          <Box sx={{ flexGrow: 1 }} />
          <StyledButton
            variant={"primary"}
            style={{ width: "160px" }}
            type="submit"
          >
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
