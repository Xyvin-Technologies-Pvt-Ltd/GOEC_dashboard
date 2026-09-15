import { Box, Grid, Hidden, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledSelectField from "../../../../../ui/styledSelectField";
import StyledDivider from "../../../../../ui/styledDivider";
import StyledButton from "../../../../../ui/styledButton";
import { useForm, Controller } from "react-hook-form";
import { useChangeAvailability } from "../../../../../hooks/mutations/useOcppMutation";
import { toast } from "react-toastify";

const Toast = ({ title, code, variant = "success", ...props }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "#252525",
        borderRadius: "4px",
        justifyContent: "space-between",
        m: 1,
        p: 1,
        position: "relative",
        width: "98%",
        zIndex: 100,
        mt: "147px",
      }}
    >
      <Typography
        variant="subtitle2"
        color={variant === "success" ? "success.main" : "error.main"}
      >
        {title}
      </Typography>
      <Typography variant="subtitle2" color={"primary.DimText"}>
        {code}
      </Typography>
    </Stack>
  );
};

const PayloadComponent = ({
  title,
  code,
  variant = "success",
  toast = false,
  toastVariant = "success",
  toastTitle,
  toastCode,
  ...props
}) => {
  return (
    <Box sx={{ borderRadius: "4px", overflow: "hidden" }}>
      <Stack sx={{ backgroundColor: "#252525", p: 1 }}>
        <Typography variant="subtitle2" sx={{ color: "primary.DimText" }}>
          {title}
        </Typography>
      </Stack>
      <Box sx={{ backgroundColor: "secondary.contrast", height: "250px", display:"flex", justifyContent:"space-between", flexDirection:"column" }}>
        <Typography
          variant="body2"
          sx={{
            color: variant === "success" ? "success.main" : "error.main",
            p: 2,
          }}
        >
          {JSON.stringify(code)}
        </Typography>
        {toast && (
          <Toast title={toastTitle} code={toastCode} variant={toastVariant} />
        )}
      </Box>
    </Box>
  );
};

export default function ChargerAvailable() {
  let connectiorId = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ];

  let type = [
    { label: "Inoperative", value: "Inoperative" },
    { label: "Operative", value: "Operative" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      connectorId: "",
      type: "",
    },
  });

  const [availablityData, setAvailablityData] = useState();
  const [payloadData, setPayloadData] = useState();
  const changeAvailabilityMutation = useChangeAvailability({
    onSuccess: (res) => {
      if (res) {
        setAvailablityData(res.data);
        const successToastId = toast.success(res.message, { position: "top-right" });
        toast.update(successToastId);
        reset();
      }
    },
    onError: (error) => {
      const msg = error?.response?.data?.error || error?.message || "Failed to change availability";
      const errorToastId = toast.error(msg, { position: "top-right" });
      toast.update(errorToastId);
    },
  });

  const onSubmit = (formData) => {
    const data = {
      connectorId: formData.connectorId.value,
      type: formData.type.value,
    };
    setPayloadData(data);
    const cpid = sessionStorage.getItem("cpid");
    changeAvailabilityMutation.mutate({ cpid, data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            backgroundColor: "secondary.main",
            px: 3,
            mt: 1,
            borderRadius: "4px",
            justifyContent: "center",
          }}
        >
          <Grid container sx={{ px: 3 }}>
            <Grid item xs={12} md={6} p={2}>
              <Stack direction={"column"} spacing={2}>
                <Typography>Connector ID</Typography>
                <Controller
                  name="connectorId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        options={connectiorId}
                        placeholder="None"
                      />
                      {errors.connectorId && (
                        <span style={errorMessageStyle}>
                          {errors.connectorId.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "connectorId is required" }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} p={2}>
              <Stack direction={"column"} spacing={2}>
                <Typography>Type</Typography>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        options={type}
                        placeholder="None"
                      />
                      {errors.type && (
                        <span style={errorMessageStyle}>
                          {errors.type.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Type is required" }}
                />
              </Stack>
            </Grid>
          </Grid>
          <StyledDivider />
          <Stack
            direction={"row"}
            sx={{ justifyContent: "center", alignItems: "center" }}
            pb={2}
            pt={1}
          >
            <StyledButton
              variant={"primary"}
              style={{ width: "160px", height: "48px" }}
            >
              Send
            </StyledButton>
          </Stack>
        </Box>
      </form>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          mt: 2,
          p: 3,
          borderRadius: "4px",
        }}
      >
        <Typography variant="subtitle2" mt={1}>
          Charger log
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <PayloadComponent
              title={"Payload: ChangeAvailability"}
              code={payloadData}
              variant={payloadData ? "success" : "error" }
              toast={true}
              toastVariant={payloadData ? "success" : "error" }
              toastTitle={payloadData ? "Payload Sent" :"Charger Not Connected"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PayloadComponent
              title={"Responds: ChangeAvailabilityConfirmation"}
              code={availablityData}
              variant={availablityData?.status === "Accepted" ? "success" : "error"}
              toastVariant={"danger"}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const errorMessageStyle = {
  color: "red",
};
