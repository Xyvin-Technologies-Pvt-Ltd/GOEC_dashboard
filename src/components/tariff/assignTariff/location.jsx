import { Grid, Typography, Container, Stack, Modal, Box, Dialog } from "@mui/material";
import React, { useMemo, useState } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import { useChargingPointsForStations } from "../../../hooks/queries/useChargingStation";
import { useChargerTariffDetail } from "../../../hooks/queries/useEvMachine";
import { getChargerTarrifDetail } from "../../../services/evMachineAPI";
import { toast } from "react-toastify";

/** OCPP / display id when present; dashboard tariff route may also accept Mongo _id. */
function resolveTariffRouteKey(dt) {
  if (!dt || typeof dt !== "object") return "";
  const candidates = [
    dt.CPID,
    dt.cpid,
    dt.chargePointDisplayName,
    dt.chargePointId,
    dt.deviceId,
    dt.ocppId,
    dt.ocppid,
    dt.name,
  ];
  const hit = candidates.find((v) => v != null && String(v).trim() !== "");
  if (hit != null) return String(hit).trim();
  return dt._id != null ? String(dt._id) : "";
}

export default function Location({ location }) {
  const [open, setOpen] = useState(false);
  const [currentTarrif, setCurrentTarrif] = useState();
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [cpidForQuery, setCpidForQuery] = useState(null);
  const queryClient = useQueryClient();

  const { data: chargerOptions = [] } = useChargingPointsForStations(selectedStationId ? [selectedStationId] : null, !!selectedStationId);
  useChargerTariffDetail(cpidForQuery, false);

  const chargerList = useMemo(
    () =>
      (chargerOptions || [])
        .filter((dt) => dt && dt._id)
        .map((dt) => {
          const cpidStr = [dt.CPID, dt.cpid, dt.chargePointDisplayName, dt.chargePointId]
            .find((v) => v != null && String(v).trim() !== "");
          const cpidResolved = cpidStr != null ? String(cpidStr).trim() : "";
          const tariffRouteKey = resolveTariffRouteKey(dt);
          const idShort = String(dt._id).slice(-8);
          return {
            label: cpidResolved || dt.name || `Charge point (${idShort})`,
            value: dt._id,
            cpid: cpidResolved,
            tariffRouteKey,
          };
        }),
    [chargerOptions]
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const selected = formData.CPID;
    const evMachineMongoId = selected?.value;
    const tariffRouteKey =
      selected?.tariffRouteKey ?? selected?.cpid ?? (evMachineMongoId ? String(evMachineMongoId) : "");
    if (!evMachineMongoId) {
      toast.error("Please select a location and CPID.", { position: "top-right" });
      return;
    }
    if (!tariffRouteKey) {
      toast.error("Could not resolve charge point id for this row.", { position: "top-right" });
      return;
    }
    setCpidForQuery(tariffRouteKey);
    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["chargerTariffDetail", tariffRouteKey],
        queryFn: () => getChargerTarrifDetail(tariffRouteKey),
      });
      if (!result?.status) {
        toast.error(result?.message || "Could not load tariff details.", { position: "top-right" });
        return;
      }
      const rows = result.result;
      const firstRow = Array.isArray(rows) ? rows[0] : rows;
      const merged =
        firstRow && typeof firstRow === "object"
          ? { ...firstRow, _id: firstRow._id ?? evMachineMongoId }
          : {
              _id: evMachineMongoId,
              CPID: selected?.cpid || tariffRouteKey,
            };
      setCurrentTarrif(merged);
      handleOpen();
    } catch (err) {
      console.error(err);
      toast.error("Could not load tariff details.", { position: "top-right" });
    }
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
    setValue("location", e);
    setSelectedStationId(e.value);
    setValue("CPID", null);
  };

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

