import React from "react";
import { Stack, Box } from "@mui/material";
import StyledButton from "../../../../../ui/StyledButton";
import { useForm, Controller } from "react-hook-form";
import StyledInput from "../../../../../ui/StyledInput";
import CalendarInput from "../../../../../ui/CalendarInput";

const modalStyle = {
  maxwidth: "auto",
  boxShadow: 2,
  p: 4,
  color: "#fff",
  outline: "none",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  minHeight: "50vh",
};

const errorMessageStyle = {
  color: "red",
};

export default function Filter({ onSubmited }) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission with data
    let dt = {
      startDate: data.startDate,
      endDate: data.endDate
    }
    onSubmited && onSubmited(dt)
    // Close your form or perform other actions
  };

  const handleDateChangeInParent = (date) => {
    setValue("startDate", date); // Assuming you have 'expiryDate' in your form state
    clearErrors("startDate");

  };
  const startDate = watch("startDate", ""); // Watching the value for 'expiryDate'


  const handleEndDateChangeInParent = (date) => {
    setValue("endDate", date); // Assuming you have 'expiryDate' in your form state
    clearErrors("endDate");

  };
  const endDate = watch("endDate", ""); // Watching the value for 'expiryDate'

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={modalStyle}>
          <Stack direction={"column"} spacing={2} sx={{ background: '' }}>
            <Label>Start date</Label>

            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}

                    iconright={
                      <CalendarInput
                        onDateChange={handleDateChangeInParent}
                      />}
                    placeholder={"mm/dd/yyyy"}
                    value={startDate}
                    readOnly

                  />
                  {errors.startDate && (
                    <span style={errorMessageStyle}>
                      {errors.startDate.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "StartDate is required" }}
            />
            <Label>End date</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}

                    iconright={
                      <CalendarInput
                        onDateChange={handleEndDateChangeInParent}
                      />}
                    placeholder={"mm/dd/yyyy"}
                    value={endDate}
                    readOnly

                  />
                  {errors.endDate && (
                    <span style={errorMessageStyle}>
                      {errors.endDate.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "endDate is required" }}
            />

            <Stack direction={"row"} spacing={1} sx={{ justifyContent: 'center' }}>
              <StyledButton variant="secondary" width={120} type="button"
                onClick={() => { reset(); onSubmited() }}>
                Reset
              </StyledButton>
              <StyledButton width={150} variant="primary" type="submit">
                Apply
              </StyledButton>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export { FormContainer, Heading, Label } from "../../../../common/FilterPrimitives";
