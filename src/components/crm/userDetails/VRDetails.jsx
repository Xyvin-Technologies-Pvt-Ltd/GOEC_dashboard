import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import { useLocation, useParams } from "react-router-dom";
import { useUserVehicleDetails } from "../../../hooks/queries/useUser";

const VRCard = ({ data }) => {
  return (
    <Box sx={{ backgroundColor: "#1D1B20", borderRadius: "24px", p: 3 }}>
      <Grid container padding={2} spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            src={data.icon !== "no image" ? data.icon : "https://imgd.aeplcdn.com/227x128/n/cw/ec/47051/compass-exterior-right-front-three-quarter-74.jpeg"}
            style={{
              height: "100%",
              width: "100%",
              aspectRatio: "2/1",
              borderRadius: "4px",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} sx={{ justifyContent: "center" }} spacing={1}>
            <Typography variant="body1" sx={{ color: "secondary.contrastText" }}>
              {data?.brand}
            </Typography>
            <Typography variant="h5">{data?.model}</Typography>
            <Stack direction={"row"} spacing={1}>
              <Typography variant="body1" sx={{ color: "secondary.contrastText" }}>
                Vehicle No:
              </Typography>
              <Typography variant="h6">{data?.evRegNumber}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              {data?.compactable_port?.map((res, i) => {
                return (
                  <Typography
                    key={i}
                    variant="inherit"
                    sx={{ backgroundColor: "#fff3", p: 1, borderRadius: "5px" }}
                  >
                    {res}
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function VRDetails() {
  const { id } = useParams();

  const { data: vehicleData } = useUserVehicleDetails(id);
  const VR = vehicleData?.result;

  return (
    <Box>
      <LastSynced heading={"VR Details"} />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>

          {VR?.map((vr, i) => {
            return (
              <Grid item xs={12} md={6} xl={4}>
                <VRCard data={vr} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
