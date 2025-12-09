import React, { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as ReloadIcon } from "../../../../assets/icons/reload.svg";
import StyledSelectField from "../../../../ui/styledSelectField";
import StyledButton from "../../../../ui/styledButton";
import ConfigElement from "./CPConfig/configElement";
import ConfigSwitch from "./CPConfig/configSwitch";
import ConfigMeter from "./CPConfig/configMeter";
import ConfigCP from "./CPConfig/configCP";
import { toast } from "react-toastify";
import { useConfiguration } from "../../../../hooks/queries/useOcpp";
import StyledBackdropLoader from "../../../../ui/styledBackdropLoader";
import ReactTimeAgo from "react-time-ago";

const configurationList = [
  {
    label: "Core Profile",
  },
  {
    label: "Local Auth List Management Profile",
  },
  {
    label: "Reservation Profile",
  },
  {
    label: "Smart Charging Profile",
  },
];

const switchList = [
  "Allow offline transaction unknown ID",
  "Authorization cache enabled",
  "Authorization remote transaction requests",
  "Local authorize offline",
  "Local pre-authorize",
  "Stop transaction on EV side disconnect",
  "Stop transaction on invalid ID",
  "Unlock connector on EV side disconnect",
  "Open charge mode enable",
];

const meterList = [
  {
    title: "Metre value aligned data",
    selectData: [],
    chipData: [],
  },
  {
    title: "Meter value Sample data",
    selectData: [],
    chipData: [],
  },
  {
    title: "Stop Transaction Sample data",
    selectData: [],
    chipData: [],
  },
  {
    title: "Stop Transaction aligned data",
    selectData: [],
    chipData: [],
  },
];

const configCPList = [
  {
    label: "Get configuration keys",
    value: "",
  },
  {
    label: "Meter value aligned data max length",
    value: "",
  },
  {
    label: "Number of connectors",
    value: "",
  },
  {
    label: "Get configuration max keys",
    value: "",
  },
  {
    label: "Stop transaction aligned data max length",
    value: "",
  },
  {
    label: "Supported feature profiles",
    value: "",
  },
  {
    label: "Supported feature profiles max length",
    value: "",
  },
  {
    label: "Local auth list max length",
    value: "",
  },
  {
    label: "Send local list max length",
    value: "",
  },
  {
    label: "Reserve connector zero supported",
    value: "",
  },
  {
    label: "Charge profile max stack level",
    value: "",
  },
  {
    label: "Charging schedule allowed charging rate unit",
    value: "",
  },
  {
    label: "Charging schedule max periods",
    value: "",
  },
  {
    label: "Max charging profiles installed",
    value: "",
  },
];

const labelToKeyMap = {
  "Connection timeout": "ConnectionTimeOut",
  "Clock aligned data interval": "ClockAlignedDataInterval",
  "Heart beat interval": "HeartbeatInterval",
  "Meter value sample interval": "MeterValueSampleInterval",
  "Get configuration max keys": "GetConfigurationMaxKeys",
  "Meter values aligned data max length": "MeterValuesAlignedDataMaxLength",
  "Meter values sampled data max length": "MeterValuesSampledDataMaxLength",
  "Number of connectors": "NumberOfConnectors",
  "Reset retries": "ResetRetries",
  "Stop txn aligned data max length": "StopTxnAlignedDataMaxLength",
  "Stop txn sampled data max length": "StopTxnSampledDataMaxLength",
  "Supported feature profiles max length": "SupportedFeatureProfilesMaxLength",
  "Transaction message attempts": "TransactionMessageAttempts",
  "Transaction message retry interval": "TransactionMessageRetryInterval",
};

const switchToKeyMap = {
  "Allow offline transaction unknown ID": "AllowOfflineTxForUnknownId",
  "Authorization cache enabled": "AuthorizationCacheEnabled",
  "Authorization remote transaction requests": "AuthorizeRemoteTxRequests",
  "Local authorize offline": "LocalAuthorizeOffline",
  "Local pre-authorize": "LocalPreAuthorize",
  "Stop transaction on EV side disconnect": "StopTransactionOnEVSideDisconnect",
  "Stop transaction on invalid ID": "StopTransactionOnInvalidId",
  "Unlock connector on EV side disconnect": "UnlockConnectorOnEVSideDisconnect",
};

export default function CPConfig() {
  const [loading, setLoading] = useState(false);
  const [configurationData, setConfigurationData] = useState([]);
  const [configParams, setConfigParams] = useState({});
  const [fetchConfig, setFetchConfig] = useState(false);
  const [date, setDate] = useState(new Date());
  const [rotate, setRotate] = useState(0);
  const [startRotate, setStartRotate] = useState(false);
  setTimeout(() => {
    if (startRotate) {
      if (rotate > 360) {
        setStartRotate(false);
      }
      setRotate(rotate + 5);
    } else {
      setRotate(0);
    }
  }, 10);

  const handleConfiguration = async (data = {}) => {
    // Use hook-driven fetching: set params and toggle fetch flag; effect will handle the request
    setLoading(true);
    setConfigParams(data);
    setFetchConfig(true);
  };

  const cpid = sessionStorage.getItem("cpid");
  const { data: configResp, error: configError, refetch: refetchConfig } = useConfiguration(cpid, configParams, fetchConfig && !!cpid);

  // when configResp arrives, update local state
  React.useEffect(() => {
    if (configResp) {
      setConfigurationData(configResp.data?.configurationKey || []);
      setLoading(false);
      setFetchConfig(false);
    }
  }, [configResp]);

  React.useEffect(() => {
    if (configError) {
      const errMsg = configError?.response?.data?.error || configError?.message || "Failed to fetch configuration";
      const errorToastId = toast.error(errMsg, { position: "top-right" });
      toast.update(errorToastId);
      setLoading(false);
      setFetchConfig(false);
    }
  }, [configError]);

  const finalConfigList = Object.keys(labelToKeyMap)
    .filter(
      (label) =>
        labelToKeyMap[label] in
        configurationData.reduce((acc, cur) => ({ ...acc, [cur.key]: true }), {})
    )
    .map((label) => ({
      label,
      data: configurationData.find((item) => item.key === labelToKeyMap[label]).value,
    }));

  const finalConfigSwitch = switchList
    .filter(
      (label) =>
        switchToKeyMap[label] &&
        configurationData.some((item) => item.key === switchToKeyMap[label])
    )
    .map((label) => ({
      label,
      data: configurationData.find((item) => item.key === switchToKeyMap[label]).value,
    }));

  configurationData.forEach((item) => {
    switch (item.key) {
      case "MeterValuesAlignedData":
        updateChipData("Metre value aligned data", item.value);
        break;
      case "MeterValuesSampledData":
        updateChipData("Meter value Sample data", item.value);
        break;
      case "StopTxnSampledData":
        updateChipData("Stop Transaction Sample data", item.value);
        break;
      case "StopTxnAlignedData":
        updateChipData("Stop Transaction aligned data", item.value);
        break;
      default:
        break;
    }
  });

  function updateChipData(title, value) {
    const foundItem = meterList.find((item) => item.title === title);
    if (foundItem) {
      const values = value.split(",").map((val) => val);
      foundItem.chipData = values;
    }
  }

  const readonlyTrueEntries = configurationData.filter((entry) => entry.readonly === true);

  const readOnly = readonlyTrueEntries.map((entry) => ({
    label: entry.key,
    value: entry.value,
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "primary.grey",
          p: 2,
        }}
      >
        <Stack direction={"column"} sx={{ ml: 2 }}>
          <Typography variant="body1" sx={{ color: "secondary.contrastText" }}>
            CP Config
          </Typography>
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
            <Typography sx={{ color: "secondary.greytext", fontSize: 12 }}>Last synced</Typography>
            <Typography sx={{ color: "success.main", fontSize: 12 }}>
              <ReactTimeAgo date={date} locale="en-US" />
            </Typography>
            <ReloadIcon
              style={{ cursor: "pointer", transform: `rotate(${rotate}deg)` }}
              onClick={() => {
                setDate(new Date());
                setStartRotate(true);
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          borderRadius: "4px",
          mx: { xs: 2, md: 30 },
          mt: { xs: 2, md: 3 },
        }}
      >
        <StyledBackdropLoader open={loading} />
        <Stack direction={"column"} sx={{ px: { xs: 3, md: 8 } }}>
          <Stack direction={"row"} sx={{ alignItems: "center", my: 5 }} spacing={{ xs: 2, md: 5 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "primary.contrastText", fontSize: "14px", fontWeight: 400 }}
            >
              Configuration
            </Typography>
            <StyledSelectField placeholder={"Core profile"} options={configurationList} />
            <StyledButton variant="primary" onClick={handleConfiguration}>
              Get Configuration
            </StyledButton>
          </Stack>
          {/* <configureElement label={"dff"} data={"dfsg"} /> */}
          <Stack direction={"column"} spacing={2} my={2}>
            {configurationData.length > 0 &&
              finalConfigList?.map((item, i) => {
                return <ConfigElement label={item.label} data={item.data} key={i} />;
              })}
          </Stack>
          <Grid container spacing={3} my={2}>
            {configurationData.length > 0 &&
              finalConfigSwitch.map((item, i) => (
                <Grid item md={6} xs={12}>
                  <ConfigSwitch label={item.label} key={i} value={item.data} />
                </Grid>
              ))}
          </Grid>
          <Stack direction={"column"} spacing={3}>
            {configurationData.length > 0 &&
              meterList.map((item, i) => (
                <ConfigMeter title={item.title} chipData={item.chipData} key={i} />
              ))}
          </Stack>
          <Grid container spacing={3} my={3}>
            {configurationData.length > 0 &&
              readOnly.map((item, i) => (
                <Grid item md={6} xs={12}>
                  <ConfigCP label={item.label} value={item.value} key={i} />
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
}
