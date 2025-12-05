import { Grid, Typography, Container, Stack, Modal, Box, Dialog } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import LastSynced from "../../../layout/LastSynced";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledButton from "../../../ui/styledButton";
import StyledWarning from "../../../ui/styledWarning";
import { ReactComponent as Warn } from "../../../assets/icons/textWarn.svg";
import StyledDivider from "../../../ui/styledDivider";
import Assign from "./assign";
import { ReactComponent as Close } from "../../../assets/icons/close-circle.svg";
import { Controller, useForm } from "react-hook-form";
import { useChargingPointsForStations } from "../../../hooks/queries/useChargingStation";
import { useChargerTariffDetail } from "../../../hooks/queries/useEvMachine";
import { useEffect } from "react";

export default function Location({ location }) {
  const [open, setOpen] = useState(false);
  const [chargerList, setChargerList] = useState([])
  const [currentTarrif, setCurrentTarrif] = useState()
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [cpidForQuery, setCpidForQuery] = useState(null);

  const { data: chargerOptions = [] } = useChargingPointsForStations(selectedStationId ? [selectedStationId] : null, !!selectedStationId);
  const { data: tariffData, refetch: refetchTariff } = useChargerTariffDetail(cpidForQuery, false);


  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm()

  const onSubmit = (data) => {
    // Handle form submission with data
    const cpidValue = data.CPID?.value || data.CPID?.label;
    setCpidForQuery(cpidValue);
    refetchTariff().then((res) => {
      const result = res?.data || res;
      if (result?.status) {
        setCurrentTarrif(result.result[0]);
        handleOpen();
      }
    }).catch((err) => {
      // handle error silently
      console.error(err);
    });
  };

  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const stationChange = (e) => {
    setValue("location", e)
    setSelectedStationId(e.value);
  }

  useEffect(() => {
    if (chargerOptions && chargerOptions.length) setChargerList(chargerOptions);
    else setChargerList([]);
  }, [chargerOptions]);
  return (
    <>
      <Box>
        {/* <LastSynced heading="Location" /> */}
        <Container >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={4}
              sx={{
                alignItems: "center",
                bgcolor: "#1c1d22",
                p: 2,
                mt: 5,
                ml:2,
                width: { md: "50%" },
              }}
            >
              <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>Locations</Typography>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField {...field} placeholder={"Select Locations"} options={location}
                        onChange={stationChange}
                      />
                      {errors.location && (
                        <StyledWarning icon={<Warn />} value={errors.location.message} />
                      )}
                    </>
                  )}
                  rules={{ required: "Location Name is required" }}
                />

              </Grid>
              <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>CPID</Typography>
                <Controller
                  name="CPID"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField {...field} placeholder={"Select CPID"} options={chargerList} />
                      {errors.CPID && (
                        <StyledWarning icon={<Warn />} value={errors.CPID.message} />
                      )}
                    </>
                  )}
                  rules={{ required: "Location Name is required" }}
                />

              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                  <StyledButton variant={"secondary"} width="103" type="button" onClick={()=>reset({})}>
                    Cancel
                  </StyledButton>
                  <StyledButton variant={"primary"} width="160">
                    Assign
                  </StyledButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
      {/* Modal */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ bgcolor: "#27292F", p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            my={2}
          >
            <Typography
              sx={{
                color: "secondary.greytext",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Assign Tariff
            </Typography>
            <Close onClick={handleClose} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <Assign tab={"location"} data={currentTarrif} onClose={handleClose}  />
        </Box>
      </Dialog>
    </>
  );
}

