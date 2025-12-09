import styled from "styled-components";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledSwitch from "../../../ui/styledSwitch";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { useForm, Controller } from "react-hook-form";

import StyledInput from "../../../ui/styledInput";
import CalendarInput from "../../../ui/CalendarInput";
import StyledButton from "../../../ui/styledButton";
import { useChargingStationDropdown } from "../../../hooks/queries/useChargingStation";
import { useOemDropdown, useEvModelDropdown } from "../../../hooks/queries/useEvMachine";
import { useCreateEvMachine, useEditEvMachine } from "../../../hooks/mutations/useEvMachineMutation";
import { toast } from "react-toastify";
import { ContentCopy } from "@mui/icons-material";
// StyledTable component
const AddChargePoint = ({ chargepointData, headers, data, onClose, formsubmitted, editStatus = false, isFromStation = false, stationId }) => {

  const [modelOptions, setModelOptions] = useState([])
  const { data: stationListData } = useChargingStationDropdown();
  const { data: oemListData } = useOemDropdown();
  const { data: modelListData } = useEvModelDropdown();
  const createMutation = useCreateEvMachine();
  const editMutation = useEditEvMachine();

  const stationList = stationListData || [];
  const OEMList = oemListData || [];
  const modelList = modelListData || [];

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      chargePointDisplayName: editStatus ? chargepointData["name"] : '',
      locationName: editStatus ? chargepointData["Station"] : '',
      chargePointOEM: editStatus ? chargepointData["OEM"] : '',
      authorisationkey: editStatus ? chargepointData["authorization_key"] : '',
      serialNumber: editStatus ? chargepointData["serial_number"] : '',
      commissionedDate: editStatus ? chargepointData["commissioned_date"] : '',
      model: editStatus ? chargepointData["Model"] : '',
      chargePointDisplayName: editStatus ? chargepointData["CPID"] : '',
      CPID: editStatus ? chargepointData["CPID"] : '',
    },
  });

  const onSubmit = (data) => {
    // Handle form submission with data
    // Close your form or perform other actions
    if (editStatus) {
      updateChargePoint(data)
    } else {
      createChargePoint(data)
    }
  };

  const createChargePoint = (data) => {
    let dt = {
      name: data.chargePointDisplayName,
      location_name: isFromStation ? stationId : data.locationName.value,
      authorization_key: data.authorisationkey,
      serial_number: data.serialNumber,
      commissioned_date: data.commissionedDate,
      evModel: data.model.value,
      CPID: data.CPID,
      OEM: data.chargePointOEM.value,
      published: data.published ? 'Yes' : "No"
    }

    createMutation.mutate(dt, {
      onSuccess: (res) => {
        toast.success("Chargepoint created successfully ")
        formsubmitted()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Failed to create chargepoint")
      }
    })
  }


  const updateChargePoint = (data) => {
    let dt = {
      name: data.chargePointDisplayName,
      location_name: isFromStation ? stationId : (data.locationName.value ? data.locationName.value : getListId(stationList, chargepointData["Station"])),
      authorization_key: data.authorisationkey,
      serial_number: data.serialNumber,
      commissioned_date: data.commissionedDate,
      evModel: data.model.value ? data.model.value : getListId(modelList, chargepointData["Model"]),
      CPID: data.CPID,
      OEM: data.chargePointOEM.value ? data.chargePointOEM.value : getListId(OEMList, chargepointData["OEM"]),
      cpidStatus: chargepointData["Status"],
      // published: data.published ? 'Yes' : "No"
    }
    data.published !== undefined && (dt.published = data.published ? 'Yes' : "No")
    editMutation.mutate({ id: chargepointData._id, data: dt }, {
      onSuccess: (res) => {
        toast.success("Chargepoint updated successfully ")
        formsubmitted()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Failed to update chargepoint")
      }
    })
  }

  const handleChange = (event) => {
    setValue("published", event.target.checked);
  };

  useEffect(() => {
    // Update model options when OEM list or model data changes
    if (editStatus && modelList && OEMList.length > 0) {
      const oemLabel = chargepointData["OEM"];
      const modelOptions = modelList.filter((dt) => dt.label === oemLabel);
      setModelOptions(modelOptions);
    }
  }, [modelList, OEMList, editStatus]);

  const getListId = (list, value) => {
    for (let index = 0; index < list.length; index++) {
      if (list[index].label == value) {
        return list[index].value
      }
    }
  }

  const handleDateChangeInParent = (date) => {
    setValue("commissionedDate", date);
    clearErrors("commissionedDate");
  };
  const commissionedDate = watch("commissionedDate", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box maxWidth="lg" p={2} sx={{ backgroundColor: 'primary.main' }}>
        {
          editStatus &&
          <Stack>
            <Typography sx={{ color: "primary.contrastText", fontWeight: "500", fontSize: '14px' }}>
              Configuration URL
            </Typography>
            <Stack spacing={2}>
              <StyledInput
                placeholder={`${chargepointData && chargepointData.configuration_url}`}
                disabled iconright={<ContentCopy style={{ cursor: 'pointer' }}
                  onClick={() => { navigator.clipboard.writeText(`${chargepointData && chargepointData.configuration_url}`); toast.success("copied") }} />}
                style={{ height: '50px', backgroundColor: '#4A4458' }} />
            </Stack>
          </Stack>
        }
        {!isFromStation &&
          <><Typography
            sx={{
              marginBottom: 3,
              marginTop: 3,
              color: "primary.contrastText",
            }}
          >
            Location Name
          </Typography><Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="locationName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        {...field}
                        placeholder="Select Location Name"
                        options={stationList} />
                      {errors.locationName && (
                        <span style={errorMessageStyle}>
                          {errors.locationName.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Location Name is required" }} />
              </Grid>
            </Grid></>
        }

        <Typography
          sx={{
            marginBottom: 3,
            marginTop: 3,
            color: "primary.contrastText",
          }}
        >
          Charge Point OEM
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="chargePointOEM"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField options={OEMList} {...field} placeholder="select OEM"
                    onChange={(e) => {
                      setValue("chargePointOEM", e)
                      let list = []
                      modelList.map((dt) => {
                        if (dt.oem === e.label) {
                          list.push({
                            label: dt.model_name,
                            value: dt._id
                          })
                        }
                      })
                      setModelOptions(list)
                    }} />
                  {errors.chargePointOEM && (
                    <span style={errorMessageStyle}>
                      {errors.chargePointOEM.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Charge Point OEM is required" }}
            />
          </Grid>
        </Grid>

        <Typography
          sx={{
            marginBottom: 3,
            marginTop: 3,
            color: "primary.contrastText",
          }}
        >
          Model Name
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField options={modelOptions} {...field} placeholder="select model" />
                  {errors.model && (
                    <span style={errorMessageStyle}>
                      {errors.model.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "Model is required" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                marginBottom: 3,
                marginTop: 3,
                color: "primary.contrastText",
              }}
            >
              Charge point display name
            </Typography>

            <Stack direction="column">
              <Controller
                name="chargePointDisplayName"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder={"GO1"} onChange={(e) => { setValue("chargePointDisplayName", e.target.value); setValue("CPID", e.target.value) }} />
                    {errors.chargePointDisplayName && (
                      <span style={errorMessageStyle}>
                        {errors.chargePointDisplayName.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Charge Point Display Name is required" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                marginBottom: 3,
                marginTop: 3,
                color: "primary.contrastText",
              }}
            >
              CPID
            </Typography>
            <Stack direction="column">
              <Controller
                name="CPID"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder="gO1" style={{ backgroundColor: '#4A4458' }} disabled />
                  </>
                )}
                rules={{ required: "CPID is required" }}
              />
            </Stack>
          </Grid>
        </Grid>

        <Typography
          sx={{
            marginBottom: 3,
            marginTop: 3,
            color: "primary.contrastText",
          }}
        >
          Authorisation key
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="authorisationkey"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder="XXXXXXXXXXXX" />
                  {errors.authorisationkey && (
                    <span style={errorMessageStyle}>
                      {errors.authorisationkey.message}
                    </span>
                  )}
                </>
              )}
              // rules={{ required: " Authorisation key is required" }}
            />
          </Grid>
        </Grid>

        <Typography
          sx={{
            marginBottom: 3,
            marginTop: 3,
            color: "primary.contrastText",
          }}
        >
          Serial number
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder="2DEFFG4345" />
                  {errors.serialNumber && (
                    <span style={errorMessageStyle}>
                      {errors.serialNumber.message}
                    </span>
                  )}
                </>
              )}
              // rules={{ required: "Serial Number is required" }}
            />
          </Grid>
        </Grid>

        <Typography
          sx={{
            marginBottom: 3,
            marginTop: 3,
            color: "primary.contrastText",
          }}
        >
          Commissioned date
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="commissionedDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder="Commissioned Date"
                    icon={<Calendar />}
                    iconright={
                      <CalendarInput
                        onDateChange={handleDateChangeInParent}
                      />
                    }
                    // value={commissionedDate}
                    readOnly
                  />
                  {errors.commissionedDate && (
                    <span style={errorMessageStyle}>
                      {errors.commissionedDate.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Commissioned Date is required" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid sx={{ marginBottom: 1, marginTop: 3 }} item xs={12} md={12}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              <Typography sx={{ color: "primary.contrastText" }}>
                Published
              </Typography>

              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <StyledSwitch
                    {...field}
                    onChange={(e) => {
                      handleChange(e);
                      // Additional logic if needed
                    }}
                    defaultChecked={editStatus && chargepointData["Published"].toUpperCase() == "YES"}
                  // Adding 'required' attribute
                  />
                )}
              />

            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Stack
              item
              xs={12}
              md={12}
              direction={"row-reverse"}
              // sx={{ flexDirection: 'row-reverse' }}
              spacing={2}
              alignItems={"center"}
              sx={{ mt: 2 }}
            >

              <StyledButton variant={"primary"} width="200" type="submit">
                {" "}
                Save{" "}
              </StyledButton>

              <StyledButton variant={"secondary"} width="160" type="button" onClick={()=>reset()}>
                {" "}
                Cancel{" "}
              </StyledButton>



            </Stack>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddChargePoint;

//! STYLINGS

// Styled action cell

// Styled table container
export const TableContainer = styled.div`
  background: #27292f; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
`;

const errorMessageStyle = {
  color: "red",
  // margin: '1px 0',
};
