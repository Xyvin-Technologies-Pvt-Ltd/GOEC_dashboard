import React from "react";
import CommonLayout from "../../../layout/CommonLayout";
import StyledInput from "../../../ui/styledInput";
import { Box, Grid, Stack, Typography } from "@mui/material";
import CalendarInput from "../../../ui/CalendarInput";
import StyledFooter from "../../../ui/StyledFooter";
import StyledButton from "../../../ui/styledButton";
import StyledSwitch from "../../../ui/styledSwitch";
import { useForm, Controller } from "react-hook-form";
import { useCreateRfid, useEditRfid } from "../../../hooks/mutations/useRfidMutation";
import { toast } from "react-toastify";

const AddRfidCard = ({ Close, editStatus = false, rfidData }) => {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      expiryDate: editStatus ? rfidData["Expires On"] : "",
      rfidTag: editStatus ? rfidData["RFID Tag"] : "",
      serialNumber: editStatus ? rfidData["Serial No"] : "",
    },
  });

  // TanStack Query mutation hooks
  const { mutate: createRfidCard, isPending: isCreating } = useCreateRfid({
    onSuccess: () => {
      toast.success("RFID added successfully");
      Close();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to add RFID");
    },
  });

  const { mutate: updateRfidCard, isPending: isUpdating } = useEditRfid({
    onSuccess: () => {
      toast.success("RFID updated successfully");
      Close();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update RFID");
    },
  });
  const onSubmit = (data) => {
    const dt = {
      expiry: data.expiryDate,
      rfidTag: data.rfidTag,
      serialNumber: data.serialNumber,
    };

    if (editStatus) {
      // Update existing RFID
      if (data.activate !== undefined) {
        dt.status = data.activate ? "active" : "inactive";
      }
      updateRfidCard({ id: rfidData._id, data: dt });
    } else {
      // Create new RFID
      dt.status = data.activate ? "active" : "unassigned";
      createRfidCard(dt);
    }
  };

  const handleDateChangeInParent = (date) => {
    setValue("expiryDate", date); // Assuming you have 'expiryDate' in your form state
    clearErrors("expiryDate");
  };

  const handleChange = (event) => {
    setValue("activate", event.target.checked);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonLayout header="Add RFID Card" onClick={Close}>
          <Typography
            variant="subtitle2"
            align="left"
            sx={{ color: "primary.contrastText" }}
          >
            RFID tag
          </Typography>
          <Controller
            name="rfidTag"
            control={control}
            render={({ field }) => (
              <>
                <StyledInput {...field} placeholder="Enter RFID Tag" />
                {errors.rfidTag && (
                  <span style={errorMessageStyle}>
                    {errors.rfidTag.message}
                  </span>
                )}
              </>
            )}
            // Adding 'required' attribute here
            rules={{ required: "RFID tag is required" }}
          />
          <Typography
            variant="subtitle2"
            align="left"
            sx={{ color: "primary.contrastText" }}
          >
            Serial number
          </Typography>
          <Controller
            name="serialNumber"
            control={control}
            render={({ field }) => (
              <>
                <StyledInput {...field} placeholder="Enter Serial number" />
                {errors.serialNumber && (
                  <span style={errorMessageStyle}>
                    {errors.serialNumber.message}
                  </span>
                )}
              </>
            )}
            rules={{ required: "Serial number is required" }}
          />

          <Typography
            variant="subtitle2"
            align="left"
            sx={{ color: "primary.contrastText" }}
          >
            RFID Expiry date
          </Typography>
          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <>
                <StyledInput
                  {...field}
                  placeholder="Enter RFID Expiry date"
                  iconright={
                    <CalendarInput onDateChange={handleDateChangeInParent} />
                  }
                  readOnly
                />
                {errors.expiryDate && (
                  <span style={errorMessageStyle}>
                    {errors.expiryDate.message}
                  </span>
                )}
              </>
            )}
            // Adding 'required' attribute here
            rules={{ required: "RFID Expiry date is required" }}
          />

          <Grid container spacing={2} direction="row">
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                align="left"
                sx={{ color: "primary.contrastText" }}
              >
                Activate RFID
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              textAlign={"right"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              <Controller
                name="activate"
                control={control}
                render={({ field }) => (
                  <StyledSwitch
                    {...field}
                    defaultChecked={
                      editStatus &&
                      (rfidData["Status"].toUpperCase() === "ASSIGNED" ||
                        rfidData["Status"].toUpperCase() === "ACTIVE")
                    }
                    onChange={(e) => {
                      handleChange(e);
                      // Additional logic if needed
                    }}
                  // Adding 'required' attribute
                  />
                )}
              />
            </Grid>
          </Grid>
        </CommonLayout>
        <StyledFooter width={"100"}>
          <Stack direction={"row"} spacing={2}>
            <StyledButton
              variant="secondary"
              width="120"
              style={{ height: "45px" }}
              type="reset"
              onClick={Close}
            >
              Cancel
            </StyledButton>
            <StyledButton
              variant="primary"
              width="150"
              style={{ height: "45px" }}
              type="submit"
            >
              Save
            </StyledButton>
          </Stack>
        </StyledFooter>
      </form>
    </Box>
  );
};

const errorMessageStyle = {
  color: "red",
  // margin: '1px 0',
};

export default AddRfidCard;
