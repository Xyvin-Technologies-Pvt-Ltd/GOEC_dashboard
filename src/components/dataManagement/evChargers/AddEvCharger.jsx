import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputField from "../../../ui/styledInput";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledInput from "../../../ui/styledInput";
import StyledButton from "../../../ui/styledButton";
import { Add } from "@mui/icons-material";
import ConnectorDetails from "./addEvcharger/connectorDetails";
import { Controller, useForm } from "react-hook-form";
import { useOemDropdown } from "../../../hooks/queries/useEvMachine";
import { useCreateEvModel, useEditEvModel } from "../../../hooks/mutations/useEvMachineMutation";
import { useEffect } from "react";
import { toast } from "react-toastify";
// StyledTable component

const outputTypeData = [
  {
    label: 'AC',
    value: 'AC'
  },
  {
    label: 'DC',
    value: 'DC'
  }
]

const OCCPVersionData = [
  {
    label: '1.6',
    value: 1.6
  },
  {
    label: '2.0',
    value: 2.0
  }
]

const numberOfPorts = [
  {
    label: '1',
    value: 1
  },
  {
    label: '2',
    value: 2
  },
  {
    label: '3',
    value: 3
  },
  {
    label: '4',
    value: 4
  }
]



export default function AddEvCharger({ editStatus = false, chargerData = {}, formSubmitted }) {
  const [connectorDetailOpen, setConnectorDetailOpen] = useState(false)
  const [noOfPorts, setNoOfPorts] = useState(editStatus ? chargerData["Number of Ports"] : 0)
  const [connectors, setConnectors] = useState(editStatus ? chargerData["connectors"] : [])
  const { data: oemData = [] } = useOemDropdown();
  const createEvModelMutation = useCreateEvModel();
  const editEvModelMutation = useEditEvModel();
  const { control, handleSubmit, setValue, reset, formState: { errors }, clearErrors } = useForm({
    defaultValues: {
      oem: editStatus ? chargerData["Company Name"] : '',
      model_name: editStatus ? chargerData["Model name"] : '',
      output_type: editStatus ? chargerData["Output Type"] : '',
      ocpp_version: editStatus ? chargerData["OCPP Version"] : '',
      capacity: editStatus ? chargerData["Capacity (kW)"] : '',
      no_of_ports: editStatus ? chargerData["Number of Ports"] : ''
    }
  });

  const onSubmit = (data) => {
    if (editStatus) {
      updateEVCharger(data)
    }else{
      createEVCharger(data)
    }

  }

  const createEVCharger = (data) => {
    if (connectors.length == 0) {
      toast.error("Enter connecters details")
    } else {
      let obj = {
        oem: data.oem.value,
        model_name: data.model_name,
        no_of_ports: data.no_of_ports.value,
        ocpp_version: data.ocpp_version.value,
        output_type: data.output_type.value,
        capacity: data.capacity,
        connectors: connectors
      }
      createEvModelMutation.mutate(obj, {
        onSuccess: (res) => {
          toast.success("EV charger Created Successfully")
          formSubmitted && formSubmitted()
        },
        onError: (error) => {
          toast.error("Could not create EV Charger")
        }
      })
    }
  }

  const updateEVCharger = (data) => {
    if (connectors.length == 0) {
      toast.error("Enter connecters details")
    } else {
      let obj = {
        oem: data.oem.value ? data.oem.value : getListId(oemData, chargerData["oem"]),
        model_name: data.model_name,
        no_of_ports: data.no_of_ports.value ? data.no_of_ports.value : getListId(noOfPorts, chargerData["no_of_ports"]),
        ocpp_version: data.ocpp_version.value ? data.ocpp_version.value : getListId(OCCPVersionData, chargerData["ocpp_version"]),
        output_type: data.output_type.value ? data.output_type.value : getListId(outputTypeData, chargerData["output_type"]),
        capacity: data.capacity,
        connectors: connectors
      }
      editEvModelMutation.mutate({ id: chargerData._id, data: obj }, {
        onSuccess: (res) => {
          toast.success("EV charger Updated Successfully")
          formSubmitted && formSubmitted()
        },
        onError: (error) => {
          toast.error("Could not update EV Charger")
        }
      })
    }
  }


  const getListId = (list,value) => {
    for (let index = 0; index < list.length; index++) {
      if (list[index].label == value) {
        return list[index].value
      }
    }
  }

  const connectorDetailsHandle = () => {
    if (noOfPorts === 0) {
      toast.error("select No of ports");
    } else {
      setConnectorDetailOpen(true)
    }
  }

  return (
    <Box>
      <Container maxWidth="md" sx={{ backgroundColor: 'secondary.main', p: 2, m: { md: editStatus ? 0 : 4 }, border: !editStatus && '1px solid #fff6', borderRadius: '4px' }}>
        <ConnectorDetails
          open={connectorDetailOpen}
          onClose={() => { setConnectorDetailOpen(false) }}
          connectorNumber={noOfPorts}
          onSubmited={(dt) => setConnectors(dt)}
          editStatus={editStatus}
          data={connectors} />
        <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
          Add Charger OEM
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="oem"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledSelectField options={oemData} {...field} placeholder={"Select Charger OEM"} />
                    {errors.oem && (
                      <span style={{ color: 'red' }}>
                        {errors.oem.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Select oem is required" }}
              />
            </Grid>
          </Grid>


          <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
            Model Name
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="model_name"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput {...field} placeholder={"Select Model Name"} />
                    {errors.model_name && (
                      <span style={{ color: 'red' }}>
                        {errors.model_name.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Enter model name is required" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
                Output type
              </Typography>
              <Stack direction="column">
                <Controller
                  name="output_type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField options={outputTypeData} {...field} placeholder={"Enter Output type"} />
                      {errors.output_type && (
                        <span style={{ color: 'red' }}>
                          {errors.output_type.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Select Output type" }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>OCPP version</Typography>
              <Stack direction="column">
                <Controller
                  name="ocpp_version"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledSelectField options={OCCPVersionData} {...field} placeholder={"select OCCP version"} />
                      {errors.ocpp_version && (
                        <span style={{ color: 'red' }}>
                          {errors.ocpp_version.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Select OCCP Version" }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
            Capacity(kW)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <>
                    <InputField {...field} placeholder={"Enter capacity"} />
                    {errors.capacity && (
                      <span style={{ color: 'red' }}>
                        {errors.capacity.message}
                      </span>
                    )}
                  </>
                )}
                rules={{ required: "Enter capacity" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ marginBottom: 3, marginTop: 3, color: 'primary.contrastText' }}>
                Number of Ports
              </Typography>
              <Grid container direction={{ xs: "column", md: "row" }} spacing={2}>
                <Grid item xs={12} md={7}>
                  <Controller
                    name="no_of_ports"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledSelectField options={numberOfPorts} menuPlacement="auto" {...field} placeholder={"Enter Output type"} onChange={(e) => { setValue("no_of_ports", e); setNoOfPorts(e.value) }} />
                        {errors.no_of_ports && (
                          <span style={{ color: 'red' }}>
                            {errors.no_of_ports.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Select no. of ports" }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <StyledButton type="button" style={{ width: '100%' }} onClick={connectorDetailsHandle}><Add /> Connector details</StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Stack direction={"row"} sx={{ justifyContent: 'end' }} p={2} spacing={2}>
            <StyledButton type="reset" style={{ width: '150px' }} variant={'secondary'}>Cancel</StyledButton>
            <StyledButton style={{ width: '200px' }} variant={'primary'} type="submit">Save</StyledButton>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};