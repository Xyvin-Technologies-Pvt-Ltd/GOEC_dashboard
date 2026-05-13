
import { Box, Dialog, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import StyledDivider from '../../../../ui/StyledDivider'
import StyledSelectField from '../../../../ui/StyledSelectField'
import StyledInput from '../../../../ui/StyledInput'
import { ReactComponent as Close } from "../../../../assets/icons/close-icon-large.svg";
import StyledButton from '../../../../ui/StyledButton'
import { Controller, useForm } from 'react-hook-form'
import { Transition } from '../../../../ui/DialogAnimation'

let compactable_ports = [
    { label: "CCS", value: "CCS" },
    { label: "CHAdeMO", value: "CHAdeMO" },
    { label: "Combo 1", value: "Combo 1" },
    { label: "GBT", value: "GBT" },
    { label: "IEC 60309", value: "IEC 60309" },
    { label: "Type 1", value: "Type 1" },
    { label: "Type 2", value: "Type 2" },
];

export default function ConnectorDetails({ open, onClose, connectorNumber = 1, data = {}, onSubmited, editStatus }) {
    let defaultValues = {}
    if (editStatus) {
        data.map((dt, ind) => {
            defaultValues[`type_${ind}`] = dt.type
            defaultValues[`energy_${ind}`] = dt.energy
        })
    }

    const { control, handleSubmit, setValue, reset, formState: { errors }, clearErrors } = useForm({
        defaultValues: defaultValues
    });



    const onSubmit = (data) => {
        const dt = [...Array(connectorNumber)].map((dt, ind) => (
            {
                connectorId: ind + 1,
                type: data[`type_${ind}`].value,
                energy: data[`energy_${ind}`]
            }
        ))
        onSubmited && onSubmited(dt)
        onClose && onClose()
    }

    return (
        <Dialog
            open={open}
            fullWidth
            TransitionComponent={Transition}
        >
            <Box sx={{ backgroundColor: 'primary.main' }}>
                <Stack direction={'row'} sx={{ justifyContent: 'space-between', px: 2, py: 2, alignItems: 'center' }}>
                    <Typography color={'primary.contrastText'} variant='h6'>Connector Details</Typography>
                    <Close style={{ cursor: 'pointer' }} onClick={() => { onClose && onClose() }} />
                </Stack>
                <StyledDivider />
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        [...Array(connectorNumber)].map((ele, index) =>
                        (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{ color: 'primary.contrastText' }} p={2}>
                                        Connector {index + 1}
                                    </Typography>
                                    <Grid container direction={{ xs: "column", md: "row" }} spacing={2} p={2}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>Type</Typography>
                                                <Controller
                                                    name={`type_${index}`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <>
                                                            <StyledSelectField {...field} options={compactable_ports} placeholder={"Enter Output type"} maxMenuHeight={170} menuPlacement="auto" />
                                                            {errors[`type_${index}`] && (
                                                                <span style={{ color: 'red' }}>
                                                                    {errors[`type_${index}`].message}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                    rules={{ required: "Select type is required" }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>Energy(kwh)</Typography>

                                                <Controller
                                                    name={`energy_${index}`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <>
                                                            <StyledInput {...field} placeholder={'Enter Value'} />
                                                            {errors[`energy_${index}`] && (
                                                                <span style={{ color: 'red' }}>
                                                                    {errors[`energy_${index}`].message}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                    rules={{ required: "Select type is required" }}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <StyledDivider />
                            </Grid>
                        )
                        )
                    }
                    <Stack direction={'row'} sx={{ justifyContent: 'end', px: 2, py: 2, alignItems: 'center', backgroundColor: 'secondary.main' }} spacing={2}>
                        <StyledButton variant='secondary' style={{ width: '140px', height: '45px' }} onClick={() => { onClose && onClose() }}>Cancel</StyledButton>
                        <StyledButton variant='primary' style={{ width: '140px', height: '45px' }} >Save</StyledButton>
                    </Stack>
                </form>
            </Box>
        </Dialog>
    )
}
