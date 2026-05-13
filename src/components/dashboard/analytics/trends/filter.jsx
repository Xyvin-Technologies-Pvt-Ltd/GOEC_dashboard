import React, { useMemo } from "react";
import { Stack, Box, Grid } from "@mui/material";
import StyledSelectField from "../../../../ui/StyledSelectField";
import StyledButton from "../../../../ui/StyledButton";
import { useForm, Controller } from "react-hook-form";
import StyledInput from "../../../../ui/StyledInput";
import CalendarInput from "../../../../ui/CalendarInput";
import { useListOfChargingStation } from "../../../../hooks/queries/useChargingStation";

const modalStyle = {
  top: "50%",
  maxwidth: "auto",
  boxShadow: 2,
  p: 4,
  color: "#fff",
  outline: "none",
  height: "100%",
  display: "flex",
  alignItems: "center",
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
    reset,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      published: false, // Set the default value for "activate"
    },
  });

  // TanStack Query hook
  const { data: stationsData } = useListOfChargingStation();

  // Extract data with safe defaults and add "All" option
  const locations = useMemo(() => {
    if (!stationsData?.result) return [];
    return [
      { label: "All", value: "all" },
      ...stationsData.result.map((dt) => ({ label: dt.name, value: dt._id })),
    ];
  }, [stationsData]);

  const onSubmit = (data) => {
    let location = data.location?.map((item) => item.value);
    if (data.location != undefined) {
      if (location[0] === "all") {
        location = locations?.map((item) => item.value).filter(value => value !== "all");
      }
    }
    // Handle form submission with data
    let dt = {
      startDate: data.startDate,
      endDate: data.endDate,
      location: location,
    };
    onSubmited && onSubmited(dt);
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
          <Stack direction={"column"} spacing={2}>
            <FormContainer>
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
                        />
                      }
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
                        />
                      }
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
              />
              <Label>Location</Label>

              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledSelectField
                      isMulti
                      placeholder="Select Location"
                      {...field}
                      options={locations}
                      onChange={(selectedOptions) => {
                        field.onChange(selectedOptions);
                      }}
                    />
                    {errors.location && (
                      <span style={errorMessageStyle}>
                        {errors.location.message}
                      </span>
                    )}
                  </>
                )}
              />

              {/* <Label>CPID</Label>

              <Controller
                name="cpid"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledSelectField
                      placeholder={"Select Report"}
                      options={locations}
                    />
                    {errors.cpid && (
                      <span style={errorMessageStyle}>
                        {errors.cpid.message}
                      </span>
                    )}
                  </>
                )}

              /> */}

              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <StyledButton
                    width={120}
                    variant="primary"
                    fontSize="14"
                    type="submit"
                  >
                    Apply
                  </StyledButton>
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledButton
                    width={120}
                    variant="secondary"
                    fontSize="14"
                    onClick={() => {
                      reset();
                      onSubmited();
                    }}
                  >
                    Reset
                  </StyledButton>
                </Grid>
              </Grid>
            </FormContainer>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export { FormContainer, Heading, Label, TableContainer } from "../../../common/FilterPrimitives";
