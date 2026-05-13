import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import StyledSelectField from "../../ui/StyledSelectField";
import StyledButton from "../../ui/StyledButton";
import { useForm, Controller } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import CalendarInput from "../../ui/CalendarInput";
import { useListOfChargingStation, useChargingPointsOfStation } from "../../hooks/queries/useChargingStation";

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
  const [selectedStationId, setSelectedStationId] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();

  // TanStack Query hooks
  const { data: stationsData } = useListOfChargingStation();
  const { data: chargingPointsData } = useChargingPointsOfStation(
    selectedStationId,
    !!selectedStationId // only fetch when station is selected
  );

  // Extract data with safe defaults
  const locationList = stationsData?.result?.map((dt) => ({ label: dt.name, value: dt._id })) || [];
  const machineList = chargingPointsData?.result?.map((dt) => ({ label: dt.evMachines.CPID, value: dt.evMachines })) || [];

  const onSubmit = (data) => {
    // Handle form submission with data
    console.log(data);
    if (data.startDate && !data.endDate) {
      setError("endDate", { type: "custom", message: "select End Date" })
      return
    }
    // if (data.startDate == data.endDate) {
    //   setError("endDate", { type: "custom", message: "end date not able to same as start date" })
    //   return
    // }
    if (Date.parse(data.startDate) > Date.parse(data.endDate)) {
      setError("endDate", { type: "custom", message: "end date should greater than start date" })
      return
    }
    if (data.location && !data.cpid) {
      setError("cpid", { type: "custom", message: "select cpid" })
      return
    }

    let dt = {}
    for (const [key, value] of Object.entries(data)) {
      if (key === 'location') {
        if (value) {
          dt[key] = value.value;
          continue;
        }
      }
      if (key === 'cpid') {
        if (value) {
          dt[key] = value.label;
          continue;
        }
      }
      dt[key] = value
    }
    localStorage.setItem("filter", JSON.stringify(dt))
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


  useEffect(() => {
    if (localStorage.getItem("filter") !== null) {
      const savedFilter = JSON.parse(localStorage.getItem("filter"));
      reset(savedFilter);
      if (savedFilter.location) {
        setSelectedStationId(savedFilter.location);
      }
    }
  }, [reset])

  const handleLocationChange = (value) => {
    if (value) {
      setSelectedStationId(value.value);
    } else {
      setSelectedStationId(null);
    }
  };

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
            // rules={{ required: "StartDate is required" }}
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
            // rules={{ required: "endDate is required" }}
            />
            <Label>Payment Status</Label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    style={{ maxwidth: 200 }}
                    {...field}
                    placeholder={"Search Payment Status"}
                    options={locationList}
                    onChange={(value) => {
                      field.onChange(value);
                      handleLocationChange(value);
                    }}
                  />
                  {errors.location && (
                    <span style={errorMessageStyle}>
                      {errors.location.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "Location is required" }}
            />
            <Label>Transaction type</Label>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder={"Select Transaction Type"}
                    options={locationList}
                  />
                  {errors.cpid && (
                    <span style={errorMessageStyle}>
                      {errors.cpid.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "CPID is required" }}
            />

            <Label>Transaction</Label>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder={"Select Transaction Type"}
                    options={locationList}
                  />
                  {errors.cpid && (
                    <span style={errorMessageStyle}>
                      {errors.cpid.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "CPID is required" }}
            />


            <Stack direction={"row"} spacing={1} sx={{ justifyContent: 'center' }}>
              <StyledButton width={150} variant="primary" type="submit">
                Apply
              </StyledButton>
              <StyledButton variant="secondary" width={120} type="button"
                onClick={() => { reset({}); onSubmited(); localStorage.removeItem("filter"); setSelectedStationId(null); }}>
                Reset
              </StyledButton>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export { FormContainer, Heading, Label, TableContainer } from "../common/FilterPrimitives";
