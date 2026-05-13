import { Grid, Typography, Container, Stack, Box } from "@mui/material";
import React, { useState } from "react";
import StyledButton from "../../../ui/StyledButton";
import StyledSelectField from "../../../ui/StyledSelectField";
import { toast } from "react-toastify";
import { useChargingTariffList } from "../../../hooks/queries/useChargingTariff";
import { useChangeEvTariff } from "../../../hooks/mutations/useEvMachineMutation";
import { useUserAssignUnassignTariff } from "../../../hooks/mutations/useUserMutation";

const cellTh =
  "border-0 border-b border-white/20 py-2 text-left text-xs font-medium text-[#f7f8fc]";
const cellTd =
  "border-0 border-b border-white/20 py-2 text-right text-xs font-medium text-[#f7f8fc]";

export default function Assign({ tab, data, onClose, user }) {
  const [selectedtarrif, setSelectedTarrif] = useState();
  const [pageNo, setPageNo] = useState(1);

  const { data: tariffListData = {} } = useChargingTariffList(pageNo, "");
  const tarrifList = tariffListData.result?.map((dt) => ({ label: dt.name, value: dt._id })) ?? [];

  const changeEVTariffMutation = useChangeEvTariff({
    onSuccess: () => {
      toast.success("Successfully assigned", { position: "top-right" });
      onClose && onClose();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  const userTariffMutation = useUserAssignUnassignTariff({
    onSuccess: () => {
      toast.success("Successfully assigned", { position: "top-right" });
      onClose && onClose();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  const assignTarrif = () => {
    if (!selectedtarrif) return;
    const dt = { chargingTariff: selectedtarrif.value };
    if (tab === "location") {
      changeEVTariffMutation.mutate({ evMachine: data._id, data: dt });
    } else if (tab === "personal") {
      userTariffMutation.mutate({ id: user._id, data: dt });
    }
  };

  const unAssinHandle = () => {
    if (tab === "location") {
      changeEVTariffMutation.mutate({ evMachine: data._id, data: {} });
    } else if (tab === "personal") {
      userTariffMutation.mutate({ id: user._id, data: {} });
    }
  };

  return (
    <Box>
      <Container fixed>
        <Typography
          sx={{
            color: "primary.contrastText",
            fontWeight: "700",
            fontSize: 16,
            marginBottom: "12px",
          }}
        >
          Current Tariff
        </Typography>
        <table className="w-[70%] bg-[#1c1d22] p-2.5 text-xs text-white/50 [&_tbody_tr]:border-b [&_tbody_tr]:border-white/20 [&_tbody_tr:last-child]:border-b-0">
          <thead>
            <tr>
              <td colSpan={2} align="center">
                <Typography
                  sx={{
                    color: "secondary.contrastText",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Assigned Charging Tariff
                </Typography>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className={cellTh}>
                <Typography
                  sx={{
                    color: "secondary.contrastText",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  Tariff name
                </Typography>
              </th>
              <td className={cellTd}>
                {tab === "personal"
                  ? data
                    ? data.name
                    : "-"
                  : data && data.chargingTariffDetail
                    ? data.chargingTariffDetail.name
                    : "-"}
              </td>
            </tr>
            {tab === "location" && (
              <>
                <tr>
                  <th scope="row" className={cellTh}>
                    <Typography
                      sx={{
                        color: "secondary.contrastText",
                        fontWeight: "500",
                        fontSize: 12,
                      }}
                    >
                      Location
                    </Typography>
                  </th>
                  <td className={cellTd}>
                    {data && data.chargingTariffDetail ? data.chargingTariffDetail.location : "-"}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className={cellTh}>
                    <Typography
                      sx={{
                        color: "secondary.contrastText",
                        fontWeight: "500",
                        fontSize: 12,
                      }}
                    >
                      CPID
                    </Typography>
                  </th>
                  <td className={cellTd}>{data ? data.CPID : "-"}</td>
                </tr>
              </>
            )}
            {tab === "personal" && (
              <tr>
                <th scope="row" className={cellTh}>
                  <Typography
                    sx={{
                      color: "secondary.contrastText",
                      fontWeight: "500",
                      fontSize: 12,
                    }}
                  >
                    Name
                  </Typography>
                </th>
                <td className={cellTd}>{user ? user.name : "-"}</td>
              </tr>
            )}
            <tr>
              <th scope="row" className={cellTh}>
                <Typography
                  sx={{
                    color: "secondary.contrastText",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  Value
                </Typography>
              </th>
              <td className={cellTd}>
                {tab === "personal"
                  ? data
                    ? data.value
                    : "-"
                  : data && data.chargingTariffDetail
                    ? data.chargingTariffDetail.value
                    : "-"}
              </td>
            </tr>
            <tr>
              <th scope="row" className={cellTh}>
                <Typography
                  sx={{
                    color: "secondary.contrastText",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  Tax %
                </Typography>
              </th>
              <td className={cellTd}>
                {tab === "personal"
                  ? data && data.taxDetails
                    ? data.taxDetails.percentage
                    : "-"
                  : data && data.chargingTariffDetail
                    ? data.chargingTariffDetail.tax_percentage
                    : "-"}
              </td>
            </tr>
            <tr>
              <th scope="row" className={cellTh}>
                <Typography
                  sx={{
                    color: "secondary.contrastText",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  Service Fee
                </Typography>
              </th>
              <td className={cellTd}>
                {tab === "personal"
                  ? data
                    ? data.serviceAmount
                    : "-"
                  : data && data.chargingTariffDetail
                    ? data.chargingTariffDetail.serviceAmount
                    : "-"}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} align="center" style={{ paddingTop: "20px" }}>
                <StyledButton variant={"secondary"} width="141" onClick={unAssinHandle}>
                  Unassign
                </StyledButton>
              </td>
            </tr>
          </tfoot>
        </table>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography sx={{ marginBottom: 1, marginTop: 2, color: "secondary.contrastText" }}>
              Assign Tariff
            </Typography>
            <StyledSelectField
              placeholder={"Select Tariff"}
              value={selectedtarrif}
              options={tarrifList}
              maxMenuHeight={100}
              onChange={(e) => setSelectedTarrif(e)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
              <StyledButton variant={"secondary"} width="103">
                Cancel
              </StyledButton>
              <StyledButton variant={"primary"} width="160" onClick={assignTarrif}>
                Update
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
