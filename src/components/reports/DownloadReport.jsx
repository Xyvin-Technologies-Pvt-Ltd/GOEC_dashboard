import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stack, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import StyledSelectField from "../../ui/styledSelectField";
import StyledButton from "../../ui/styledButton";
import LastSynced from "../../layout/LastSynced";
import { useForm, Controller } from "react-hook-form";
import CalendarInput from "../../ui/CalendarInput";
import StyledInput from "../../ui/styledInput";
import { useChargingStationDropdown, useChargingPointsForStations } from "../../hooks/queries/useChargingStation";
import { fetchReport } from "../../hooks/queries/useReportApi";
import { useChargingSessionsReportView } from "../../hooks/queries/useReportView";
import { generateExcel } from "../../utils/excelReport";
import { formatNepalDateOnly } from "../../utils/formatNepalTime";
import { useAuthStore } from "../../store";
import ReportViewResults from "./ReportViewResults";
// report service wrappers are provided by hooks/useReportApi

const VIEWABLE_REPORTS = ["Charging Summary"];
const MAX_VIEW_RANGE_DAYS = 92;
const REPORT_DATE_FLOOR = new Date(2020, 0, 1);

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
      data.location === undefined
    ) {
      setError("location", { type: "custom", message: "select location" });
      setLoading(false);
      return;
    }
    // "" means "All locations" was explicitly picked — omit the param so the
    // backend uses the user's full allowed set (matches the single-location
    // contract every OCPP-backed report/listing endpoint expects).
    if (data.location === "") {
      data.location = undefined;
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
    const formattedDate = formatNepalDateOnly(date);
    setValue("startDate", formattedDate);
    clearErrors("startDate");
  };
  const startDate = watch("startDate", "");

  const handleEndDateChangeInParent = (date) => {
    const formattedDate = formatNepalDateOnly(date);
    setValue("endDate", formattedDate);
    clearErrors("endDate");
  };
  const endDate = watch("endDate", "");
  const location = watch("location", "");

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
      setLocationList([{ label: "All", value: "" }, ...stationDropdown]);
    }
  }, [stationDropdown]);

  const handleSelectChange = (option) => {
    setSelectedOption(option.label);
  };

  // report/listing endpoints on this backend accept a single location id (or
  // none, for "All") — a report-owned single-select drives selectedLocationIds
  // for the Alarms CPID lookup too, so "" (All) maps to the hook's "all" sentinel.
  const handleLocationChange = (value) => {
    setSelectedLocationIds(value ? [value] : ["all"]);
  };

  //! --- On-screen View (charging-sessions) ---
  const logout = useAuthStore((state) => state.logout);
  const isViewableReport = VIEWABLE_REPORTS.includes(selectedOption);

  const [viewValidationError, setViewValidationError] = useState("");
  const [committedFilters, setCommittedFilters] = useState(null);
  const [viewPage, setViewPage] = useState(1);
  const [viewLimit, setViewLimit] = useState(20);
  const [viewSortBy, setViewSortBy] = useState("transactionDate");
  const [viewSortOrder, setViewSortOrder] = useState("desc");
  const [downloadingExcel, setDownloadingExcel] = useState(false);

  const isViewStale =
    !!committedFilters &&
    (committedFilters.report !== selectedOption ||
      committedFilters.startDate !== startDate ||
      committedFilters.endDate !== endDate ||
      committedFilters.location !== location);

  const viewParams = committedFilters
    ? {
        reportType: "charging-sessions",
        startDate: committedFilters.startDate,
        endDate: committedFilters.endDate,
        ...(committedFilters.location ? { location: committedFilters.location } : {}),
        page: viewPage,
        limit: viewLimit,
        sortBy: viewSortBy,
        sortOrder: viewSortOrder,
      }
    : null;

  const {
    data: viewData,
    isLoading: viewLoading,
    isError: viewIsError,
    error: viewError,
    refetch: refetchView,
  } = useChargingSessionsReportView(viewParams, !!committedFilters);

  useEffect(() => {
    if (viewError?.response?.status === 401) {
      logout();
    }
  }, [viewError, logout]);

  const validateViewFilters = () => {
    if (!isViewableReport) return "On-screen view is not available for this report yet";
    if (!startDate || !endDate) return "Select both start and end date to view the report";
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    if (end.isBefore(start, "day")) return "End date cannot be before start date";
    if (end.diff(start, "day") > MAX_VIEW_RANGE_DAYS) {
      return `Date range cannot exceed ${MAX_VIEW_RANGE_DAYS} days`;
    }
    return "";
  };

  const handleView = () => {
    const error = validateViewFilters();
    setViewValidationError(error);
    if (error) return;
    setCommittedFilters({ report: selectedOption, startDate, endDate, location });
    setViewPage(1);
  };

  const handleSortChange = (sortKey) => {
    if (viewSortBy === sortKey) {
      setViewSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setViewSortBy(sortKey);
      setViewSortOrder("desc");
    }
    setViewPage(1);
  };

  const handleLimitChange = (newLimit) => {
    setViewLimit(newLimit);
    setViewPage(1);
  };

  const viewErrorMessage = (() => {
    const status = viewError?.response?.status;
    if (status === 400) return viewError?.response?.data?.error || "Invalid filters for this report.";
    if (status === 401) return "Session expired. Redirecting to login...";
    if (status === 403) return "You don't have access to this location";
    if (status === 500) return "Something went wrong. Please try again.";
    if (viewIsError) return "Something went wrong. Please try again.";
    return "";
  })();

  const handleDownloadExcel = async () => {
    if (!committedFilters) return;
    setDownloadingExcel(true);
    try {
      const payload = {
        report: "Charging Summary",
        startDate: committedFilters.startDate,
        endDate: committedFilters.endDate,
        ...(committedFilters.location ? { location: committedFilters.location } : {}),
      };
      const reportData = await fetchReport("Charging Summary", payload);
      const excelData = reportData.result;
      if (excelData) {
        generateExcel(excelData.headers, excelData.body);
      }
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      setDownloadingExcel(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LastSynced heading="Reports" />

        <TableContainer>
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
                      iconright={<CalendarInput onDateChange={handleDateChangeInParent} minDate={REPORT_DATE_FLOOR} />}
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
                      iconright={<CalendarInput onDateChange={handleEndDateChangeInParent} minDate={REPORT_DATE_FLOOR} />}
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
                            placeholder="Select Location"
                            options={locationList}
                            value={field.value}
                            onChange={(option) => {
                              const value = option?.value ?? "";
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

              <ButtonRow>
                <StyledButton variant="primary" fontSize="14" type="submit">
                  {loading ? "Downloading..." : "Download"}
                </StyledButton>

                <Tooltip
                  title={isViewableReport ? "" : "On-screen view is not available for this report yet"}
                  disableHoverListener={isViewableReport}
                >
                  <span style={{ width: "100%" }}>
                    <StyledButton
                      type="button"
                      variant="secondary"
                      fontSize="14"
                      disabled={!isViewableReport}
                      onClick={handleView}
                    >
                      View
                    </StyledButton>
                  </span>
                </Tooltip>
              </ButtonRow>
              {viewValidationError && <span style={errorMessageStyle}>{viewValidationError}</span>}
            </FormContainer>
          </Stack>
        </TableContainer>
      </form>

      {committedFilters && (
        <ReportViewResults
          data={viewData}
          isLoading={viewLoading}
          isError={viewIsError}
          errorMessage={viewErrorMessage}
          onRetry={viewErrorMessage && viewError?.response?.status === 500 ? refetchView : null}
          sortBy={viewSortBy}
          sortOrder={viewSortOrder}
          onSortChange={handleSortChange}
          page={viewPage}
          limit={viewLimit}
          onPageChange={setViewPage}
          onLimitChange={handleLimitChange}
          onDownloadExcel={handleDownloadExcel}
          downloadLoading={downloadingExcel}
          stale={isViewStale}
        />
      )}
    </>
  );
}

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  margin: 20px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: inline-flex;
  padding: 30px 20px;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  background: #1c1d22;
`;

export const Heading = styled.h1`
  color: var(--Grey, #b5b8c5);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
`;

export const Label = styled.label`
  color: var(--white, #f7f8fc);
  text-align: start;
  width: 100%;
  height: 16px;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
  text-transform: capitalize;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const errorMessageStyle = {
  color: "red",
};
