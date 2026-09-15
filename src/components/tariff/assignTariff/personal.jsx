import { Grid, Typography, Container, Stack, Modal, Box, Dialog } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledSelectField from "../../../ui/styledSelectField";
import InputField from "../../../ui/styledInput";
import StyledButton from "../../../ui/styledButton";
import { ReactComponent as Phone } from "../../../assets/icons/Phone.svg";
import StyledWarning from "../../../ui/styledWarning";
import { ReactComponent as Warn } from "../../../assets/icons/textWarn.svg";
import StyledDivider from "../../../ui/styledDivider";
import Assign from "./assign";
import { ReactComponent as UserIcon } from '../../../assets/icons/Frame 42744.svg'
import { ReactComponent as Refresh } from '../../../assets/icons/autorenew.svg'
import { ReactComponent as Close } from "../../../assets/icons/close-circle.svg";
import { Controller, useForm } from "react-hook-form";
import { useChargingPointsOfStation } from "../../../hooks/queries/useChargingStation";
import { useUserByMob, useUserChargingTariff } from "../../../hooks/queries/useUser";
import { toast } from "react-toastify";

export default function Personal({ location }) {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stationId, setStationId] = useState("");
  const [currentTarrif, setCurrentTarrif] = useState();

  const { data: userData } = useUserByMob(phoneNumber, !!phoneNumber);
  const user = userData?.result;

  const { refetch: fetchTariff } = useUserChargingTariff(user?._id, false);
  const { data: stationPoints } = useChargingPointsOfStation(stationId, !!stationId);

  const chargerList = stationPoints?.result?.map((dt) => ({ label: dt.cpid, value: dt._id })) || [];

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
    if (!user) {
      toast.error("Please enter the valid mobile of user")
      return
    }
    fetchTariff().then(({ data: res }) => {
      if (res?.status) {
        setCurrentTarrif(res.result)
        handleOpen()
      }
    })
    // handleOpen();
  };
  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const phoneNumberChangeHandle = (e) => {
    setPhoneNumber(e.target.value)
  }

  const stationChange = (e) => {
    setValue("location", e)
    setStationId(e.value)
  }
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
                ml: 2,
                width: { md: "50%" },
              }}
            >
              <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>Person</Typography>
                <InputField icon={<Phone />} placeholder={"Enter Phone number"} onChange={phoneNumberChangeHandle} />
              </Grid>
              <Grid item md={12}>
                <InputField placeholder={user && user.name} icon={<UserIcon />} iconright={<Refresh />} disabled />
              </Grid>
              {/* <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>Change Location</Typography>
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
              </Grid> */}
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
                  {/* <StyledButton variant={"secondary"} width="103" type="button" onClick={()=>reset({})}>
                    Cancel
                  </StyledButton> */}
                  <StyledButton
                    variant={"primary"}
                    width="160"
                  >
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
              Add Tariff
            </Typography>
            <Close onClick={handleClose} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <Assign tab={"personal"} data={currentTarrif} onClose={handleClose} user={user} />
        </Box>
      </Dialog>
    </>
  );
}

