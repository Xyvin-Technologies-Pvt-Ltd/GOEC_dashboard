import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import TariffCard from "./userTariff/tariffCard";
import AssignTariff from "./userTariff/assignTariff";
import { useLocation, useParams } from "react-router-dom";
import { useUserChargingTariff } from "../../../hooks/queries/useUser";

const tariffData = [
  {
    tarrifName: "Default",
    Location: "Oberon Mall",
    CPID: "GOEC1",
    Value: 15,
    Tax: "GST Kerala",
    ServiceFee: "-",
  },
  {
    tarrifName: "Default",
    Location: "Oberon Mall",
    CPID: "GOEC1",
    Value: 15,
    Tax: "GST Kerala",
    ServiceFee: "-",
  },
  {
    tarrifName: "Default",
    Location: "Oberon Mall",
    CPID: "GOEC1",
    Value: 15,
    Tax: "GST Kerala",
    ServiceFee: "-",
  },
  {
    tarrifName: "Default",
    Location: "Oberon Mall",
    CPID: "GOEC1",
    Value: 15,
    Tax: "GST Kerala",
    ServiceFee: "-",
  },
];

export default function UserTariff() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [isChange, setIsChange] = useState(false);

  const { data: tariffData } = useUserChargingTariff(id);
  const tariff = tariffData?.result;

  return (
    <Box>
      <AssignTariff
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <LastSynced
        heading={"Tarrif"}
        showButton={true}
        handleClick={() => {
          setOpen(true);
        }}
      />
      <Grid container sx={{ p: { xs: 2, md: 4 }, justifyContent: "center" }} spacing={2}>
        {!tariff ? (
          <Typography color={"#deb500"} sx={{ textAlign: "center" }}>
            No Data
          </Typography>
        ) : (
          <TariffCard data={tariff} onIsChange={setIsChange} isChange={isChange} userId={id}/>
        )}
      </Grid>
    </Box>
  );
}
