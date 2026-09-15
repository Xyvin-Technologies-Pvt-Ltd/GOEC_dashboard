import { Container, Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../../ui/styledInput";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledButton from "../../../ui/styledButton";
import StyledPhoneNumber from "../../../ui/StyledPhoneNumber";
import LastSynced from "../../../layout/LastSynced";
import StyledDivider from "../../../ui/styledDivider";
import { ReactComponent as SearchButtonIcon } from "../../../assets/icons/searchGlass.svg";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import StyledInput from "../../../ui/styledInput";
import { useUserByEmailMobile } from "../../../hooks/queries/useUser";
import { useListOfChargingStation, useChargingPointsOfStation } from "../../../hooks/queries/useChargingStation";
import { useRemoteStart } from "../../../hooks/mutations/useOcppMutation";

export default function RemoteSession() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState();
  const [selectedStationId, setSelectedStationId] = useState(null);

  const [locationList, setLocationList] = useState([])
  const [machineList, setMachineList] = useState([])
  const [connectorList, setConnectorList] = useState([])

  // TanStack Query hooks
  const { data: userQueryData, refetch: refetchUser } = useUserByEmailMobile(`phoneNumber=${phoneNumber}`, false);
  const { data: stationsData } = useListOfChargingStation();
  const { data: chargingPointsData, refetch: refetchChargingPoints } = useChargingPointsOfStation(selectedStationId, false);
  const { mutate: startRemoteSession, isPending: isStarting } = useRemoteStart({
    onSuccess: () => {
      toast.success("Remote session started");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to start remote session");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue
  } = useForm();
  const onSubmit = (data) => {
    const CPID = data.cpid.value.CPID;
    const requestData = {
      idTag: user.userId,
      connectorId: data.connectorId.value
    };

    startRemoteSession({ data: requestData, cpid: CPID });
  };

  const handleUserFetch = () => {
    refetchUser().then((res) => {
      if (res.data?.result?.[0]) {
        setUser(res.data.result[0]);
      } else {
        toast.error("User not found");
        setUser(undefined);
      }
    }).catch((error) => {
      toast.error("User not found");
      setUser(undefined);
    });
  };

  // Update location list when stations data is available
  useEffect(() => {
    if (stationsData?.status && stationsData?.result) {
      setLocationList(stationsData.result.map((dt) => ({ label: dt.name, value: dt._id })));
    }
  }, [stationsData]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const cpid = [{ value: "GOEC117", label: "GOEC117" }];
  const connectorId = [{ value: "1", label: "1" }];
  const session = [{ value: "session", label: "session" }];
  const location = [{ value: "location", label: "location" }];
  return (
    <>
      <LastSynced heading="Start Remote Sessions" lastSyncVisible={false} />
      <Container maxWidth="lg">
        <Grid item sm container spacing={6} sx={{ my: 2 }}>
          {/*First Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: "#1C1D22", padding: 2, margin: 2 }}>
              <Typography
                sx={{
                  mt: 1,
                  mb: 1,
                  color: "var(--Grey, #B5B8C5)",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Inter",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "32px" /* 177.778% */,
                }}
              >
                Start Remote Session
              </Typography>
              <StyledDivider />
              <Typography sx={typoLabel}>Phone number</Typography>
              <Grid container spacing={2} item xs={12} md={12}>
                <Grid item xs={9}>
                  <StyledInput
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter Phone number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <StyledButton variant="primary" width="70" height="50" onClick={handleUserFetch}>
                    <SearchButtonIcon />
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Other Sections */}
          {user &&
            <Grid item xs={12} md={6} sx={{ marginTop: { xs: 2, sm: 0 } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {" "}
                <Box sx={{ backgroundColor: "#1C1D22", padding: 2, margin: 2 }}>
                  <Typography sx={typoLabel}>User Name</Typography>
                  <InputField placeholder={user.username} style={{ backgroundColor: '#4A4458' }} disabled />
                  <Typography sx={typoLabel}>Location</Typography>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          options={locationList}
                          placeholder={"Select Location"}
                          {...field}
                          onChange={(e) => {
                            setMachineList([]);
                            setValue("location", e);
                            setSelectedStationId(e.value);
                            refetchChargingPoints().then((res) => {
                              if (res.data?.result) {
                                setMachineList(res.data.result.map((dt) => ({ label: dt.evMachines.CPID, value: dt.evMachines })));
                              }
                            });
                          }}
                        />
                        {errors.location && (
                          <span style={errorMessageStyle}>
                            {errors.location.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Location is required" }}
                  />
                  <Typography sx={typoLabel}>CPID</Typography>
                  <Controller
                    name="cpid"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          options={machineList}
                          placeholder={"Select Chargepoint"}
                          {...field}
                          onChange={(e) => {
                            setConnectorList([]);
                            setValue("cpid", e);
                            setConnectorList(e.value.connectors.map((dt) => ({ label: dt.connectorId, value: dt.connectorId })));
                          }}
                        />
                        {errors.cpid && (
                          <span style={errorMessageStyle}>
                            {errors.cpid.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "CPID is required" }}
                  />
                  <Typography sx={typoLabel}>Connector ID</Typography>
                  <Controller
                    name="connectorId"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          options={connectorList}
                          placeholder={"Select Connector"}
                          {...field}
                        />
                        {errors.connectorId && (
                          <span style={errorMessageStyle}>
                            {errors.connectorId.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Connector ID is required" }}
                  />
                  {/* <Typography sx={typoLabel}>Session Mode</Typography>

                <Controller
                  name="sessionMode"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        options={session}
                        placeholder={"Select Session Mode"}
                        {...field}
                      />
                      {errors.sessionMode && (
                        <span style={errorMessageStyle}>
                          {errors.sessionMode.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Session Mode is required" }}
                /> */}
                  {/* <Typography sx={typoLabel}>Value</Typography> */}

                  <Grid container spacing={2} item xs={12} md={12} sx={{ py: 3 }}>
                    {/* <Grid item xs={12} md={9}>
                    <Controller
                      name="value"
                      control={control}
                      render={({ field }) => (
                        <>
                          <InputField placeholder={"Enter Value"} {...field} />
                          {errors.value && (
                            <span style={errorMessageStyle}>
                              {errors.value.message}
                            </span>
                          )}
                        </>
                      )}
                      rules={{ required: "Value is required" }}
                    />
                  </Grid> */}
                    <Grid item xs={12} md={3} sx={{ px: 1 }}>
                      <StyledButton
                        variant="primary"
                        type="submit"
                        width="100"
                        height="50"
                      >
                        {isStarting ? "Starting..." : "Start"}
                      </StyledButton>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          }
        </Grid>

      </Container>
    </>
  );
}

const typoLabel = {
  mt: 3,
  mb: 1,
  color: "var(--white, #F7F8FC)",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "16px",
};
const errorMessageStyle = {
  color: "red",
};
