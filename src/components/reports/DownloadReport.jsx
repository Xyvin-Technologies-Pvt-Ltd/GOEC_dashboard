import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import StyledSelectField from "../../ui/StyledSelectField";
import StyledButton from "../../ui/StyledButton";
import LastSynced from "../../layout/LastSynced";
import { useForm, Controller } from "react-hook-form";
import CalendarInput from "../../ui/CalendarInput";
import StyledInput from "../../ui/StyledInput";
import { useChargingStationDropdown, useChargingPointsForStations } from "../../hooks/queries/useChargingStation";
import { fetchReport } from "../../hooks/queries/useReportApi";
import { generateExcel } from "../../utils/excelReport";
import dayjs from "dayjs";
import { FormContainer, Heading, Label } from "../common/FilterPrimitives";
// report service wrappers are provided by hooks/useReportApi

export default function DownloadReport() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();

  // use report helper from hooks

  const onSubmit = async (data) => {
    setLoading(true);
    data = { ...data, report: selectedOption };
    if (data.startDate && !data.endDate) {
      setError("endDate", { type: "custom", message: "select End Date" });
      setLoading(false);
      return;
    }

    if (
      data.report !== "Account Transaction" &&
      data.report !== "Charge points" &&
      data.report !== "User Registration" &&
      !data.location
    ) {
      setError("location", { type: "custom", message: "select location" });
      setLoading(false);
      return;
    } else if (data.location) {
      data.location = data.location.filter((loc) => loc.value !== "all").map((loc) => loc.value);
    }

    if (data.report === "Alarms" && !data.cpid) {
      setError("cpid", { type: "custom", message: "select location" });
      setLoading(false);
      return;
    } else if (data.cpid) {
      data.cpid = data.cpid.filter((cp) => cp.value !== "all").map((cp) => cp.value);
    }

    try {
      const reportData = await fetchReport(data.report, data);
      const excelData = reportData.result;
      if (excelData) {
        generateExcel(excelData.headers, excelData.body);
      }
      reset();
      setSelectedOption("");
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChangeInParent = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setValue("startDate", formattedDate);
    clearErrors("startDate");
  };
  const startDate = watch("startDate", "");

  const handleEndDateChangeInParent = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setValue("endDate", formattedDate);
    clearErrors("endDate");
  };
  const endDate = watch("endDate", "");

  const options = [
    { value: "Account Transaction", label: "Account Transaction" },
    { value: "Feedback", label: "Feedback" },
    { value: "Charging Summary", label: "Charging Summary" },
    { value: "User Registration", label: "User Registration" },
    { value: "Alarms", label: "Alarms" },
    { value: "Charge points", label: "Charge points" },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState(null);
  const { data: stationDropdown = [] } = useChargingStationDropdown();
  const { data: machinesForLocations = [] } = useChargingPointsForStations(selectedLocationIds, !!selectedLocationIds);

  // keep machineList in sync with hook response
  useEffect(() => {
    if (machinesForLocations && machinesForLocations.length) setMachineList(machinesForLocations);
    else setMachineList([]);
  }, [machinesForLocations]);

  useEffect(() => {
    // stationDropdown comes formatted from hook
    if (stationDropdown && stationDropdown.length) {
      setLocationList([{ label: "All", value: "all" }, ...stationDropdown]);
    }
  }, [stationDropdown]);

  const handleSelectChange = (option) => {
    setSelectedOption(option.label);
  };

  const handleLocationChange = (selectedOptions) => {
    const hasAllOption = selectedOptions.some((option) => option.value === "all");
    if (hasAllOption) {
      setSelectedLocationIds(["all"]);
    } else {
      const locationIds = selectedOptions.map((option) => option.value);
      setSelectedLocationIds(locationIds);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LastSynced heading="Reports" />

        <div className="mx-4 my-5 flex items-center justify-center overflow-x-auto rounded-lg">
          <Stack direction={"column"} spacing={2}>
            <FormContainer>
              <Heading variant="h1">Download Report</Heading>

              <Label>Report</Label>
              <Controller
                name="report"
                control={control}
                render={({ field }) => (
                  <StyledSelectField
                    placeholder="Select Report"
                    options={options}
                    value={options.find((option) => option.label === selectedOption)}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSelectChange(e);
                    }}
                  />
                )}
              />
            </FormContainer>

            <FormContainer>
              <Label>Start date</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput
                      {...field}
                      iconright={<CalendarInput onDateChange={handleDateChangeInParent} />}
                      placeholder="mm/dd/yyyy"
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
                      iconright={<CalendarInput onDateChange={handleEndDateChangeInParent} />}
                      placeholder="mm/dd/yyyy"
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

              {selectedOption !== "Account Transaction" &&
                selectedOption !== "Charge points" &&
                selectedOption !== "User Registration" && (
                  <>
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
                            options={locationList}
                            onChange={(selectedOptions) => {
                              field.onChange(selectedOptions);
                              handleLocationChange(selectedOptions);
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
                  </>
                )}

              {selectedOption === "Alarms" && (
                <>
                  <Label>CPID</Label>
                  <Controller
                    name="cpid"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          isMulti
                          placeholder="Select CPID"
                          {...field}
                          options={[{ label: "All", value: "all" }, ...machineList]}
                        />
                        {errors.cpid && (
                          <span style={errorMessageStyle}>
                            {errors.cpid.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </>
              )}

              <StyledButton variant="primary" fontSize="14" type="submit">
                {loading ? "Downloading..." : "Download"}
              </StyledButton>
            </FormContainer>
          </Stack>
        </div>
      </form>
    </>
  );
}

const errorMessageStyle = {
  color: "red",
};
