import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ReactComponent as Station } from "../../../../assets/icons/station.svg";
import { ReactComponent as ContentCopy } from "../../../../assets/icons/content_copy.svg";
import StyledDivider from "../../../../ui/styledDivider";
import StyledInput from "../../../../ui/styledInput";
import { toast } from "react-toastify";
import moment from "moment";
export default function ChargePointDetailsCard({ data }) {
  const station = data?.chargingStationDetails?.[0];
  const model = data?.evModelDetails?.[0];

  return (
    <Box pb={2} sx={{ backgroundColor: "secondary.main", borderRadius: "4px" }}>
      <Stack px={3} pt={2} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <Station />
          <Typography
            sx={{ color: "secondary.contrastText", fontWeight: "700" }}
          >
            {data && data.CPID}
          </Typography>
        </Stack>
      </Stack>
      <StyledDivider />
      <Stack px={2}>
        <Typography
          sx={{
            color: "primary.contrastText",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Configuration URL
        </Typography>
        <Stack spacing={2}>
          <StyledInput
            placeholder={`${data && data.configuration_url}`}
            disabled
            iconright={
              <ContentCopy
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${data && data.configuration_url}`
                  );
                  toast.success("copied");
                }}
              />
            }
            style={{ height: "40px" }}
          />
        </Stack>
      </Stack>

      <Stack my={2} px={2} sx={{ borderRadius: "10px", fontSize: "14px" }}>
        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#211F26" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Charge Location
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {station?.name ?? "—"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#2B2930" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            OEM
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {model?.oem ?? "—"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#211F26" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Model
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {model?.model_name ?? "—"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#2B2930" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Type
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {model?.charger_type ?? "—"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#211F26" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Serial Number
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {data && data.serial_number}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#2B2930" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Communication Protocol (Version)
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {model?.ocpp_version ?? "—"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#211F26" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Commissioned On
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {data && data.commissioned_date}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#2B2930" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Published
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {data && data.published}
          </Typography>
        </Stack>


        <Stack
          direction={"row"}
          p={1.3}
          sx={{ justifyContent: "space-between", backgroundColor: "#211F26" }}
        >
          <Typography
            sx={{
              color: "primary.DimText",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Created On
          </Typography>
          <Typography
            sx={{
              color: "primary.contrastText",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            {data?.createdAt
              ? moment(data.createdAt).format("DD-MM-YYYY")
              : "—"}
          </Typography>
        </Stack>

        {/*not need design fro integration*/}
        {/* <Stack direction={"row"} p={1.3} sx={{ justifyContent: "space-between", backgroundColor: "#211F26" }}>
          <Typography
            sx={{ color: "primary.DimText", fontWeight: "500", fontSize: '14px' }}
          >
            SuperFast
          </Typography>
          <Typography
            sx={{ color: "primary.contrastText", fontWeight: "400", fontSize: '14px' }}
          >
            {data && data.location_name}
          </Typography>
        </Stack> */}
      </Stack>
    </Box>
  );
}
