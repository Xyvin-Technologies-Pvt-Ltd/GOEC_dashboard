import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system'
import { ArrowBackIosNew } from '@mui/icons-material'
import StyledTab from '../../../ui/styledTab'
import CPAction from './chargePointDetail/CPAction'
import CPConfig from './chargePointDetail/CPConfig'
import Transactions from './chargePointDetail/transactions'

import ChargePointDetailsAnalytics from './chargePointDetail/chargePointDetailsAnalytics'
import ChargePointDetailsCard from './chargePointDetail/chargePointDetailsCard'
import ChargePointDetailsAction from './chargePointDetail/chargePointDetailsAction'
import ChargePointDetailsConnectors from './chargePointDetail/chargePointDetailsConnectors'
import ChargerLog from './chargePointDetail/chargerLog'
import Alarm from './chargePointDetail/alarm'
import Tariff from './chargePointDetail/tariff'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEvMachineById } from '../../../hooks/queries/useEvMachine'
import { useClearCache, useReset, useUnlock } from '../../../hooks/mutations/useOcppMutation'
import StyledBackdropLoader from '../../../ui/styledBackdropLoader'
import { toast } from 'react-toastify'


export default function ChargePointDetail() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [toggleOption, setToggleoption] = useState(0)
    const { data: chargepointData, isLoading: loaderOpen } = useEvMachineById(id);
    const resetMutation = useReset();
    const clearCacheMutation = useClearCache();
    const unlockMutation = useUnlock();

    useEffect(() => {
        if (chargepointData?.CPID) {
            sessionStorage.setItem('cpid', chargepointData.CPID);
        }
    }, [chargepointData])



    const actionButtonHandle = (button) => {
        if (button === "hard") {
            resetMutation.mutate(
                { cpid: chargepointData.CPID, formData: { type: "Hard" } },
                {
                    onSuccess: (res) => {
                        if (res.status) {
                            toast.success(res.message)
                        } else {
                            toast.error(res.message)
                        }
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to reset")
                    },
                }
            )
        } else if (button === "soft") {
            resetMutation.mutate(
                { cpid: chargepointData.CPID, formData: { type: "Soft" } },
                {
                    onSuccess: (res) => {
                        if (res.status) {
                            toast.success(res.message)
                        } else {
                            toast.error(res.message)
                        }
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to reset")
                    },
                }
            )
        } else if (button === "cache") {
            clearCacheMutation.mutate(chargepointData.CPID, {
                onSuccess: (res) => {
                    if (res.status) {
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to clear cache")
                },
            })
        }
    }

    const onChangeToggleOption = (e) => {
        setToggleoption(e.index)
    }

    const connectorUnlock = (connectorId) => {
        unlockMutation.mutate(
            { cpid: chargepointData.CPID, data: { connectorId: connectorId } },
            {
                onSuccess: (res) => {
                    if (res.status) {
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to unlock connector")
                },
            }
        )
    }
    return (
        <>
            <StyledBackdropLoader open={loaderOpen} />
            <Stack direction={'row'} sx={{ backgroundColor: 'secondary.main', p: 3 }} spacing={2}>
                <ArrowBackIosNew sx={{ cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
                <Typography variant='h6' color={'secondary.contrastText'}>Charge Point Details</Typography>
            </Stack>
            <Grid container spacing={2} sx={{ p: { xs: 1, md: 4 } }}>
                <Grid item xs={12} md={5} >
                    <ChargePointDetailsCard data={chargepointData} />
                </Grid>
                <Grid item xs={12} md={7} >
                    <Grid container spacing={1.5}>
                        <Grid item xs={12} md={5}>
                            <ChargePointDetailsAction buttonClickHandle={actionButtonHandle} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <ChargePointDetailsConnectors data={chargepointData && chargepointData} unlockButtonHandle={connectorUnlock} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ChargePointDetailsAnalytics data={chargepointData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <StyledTab buttons={['CP Action', 'CP config', 'Transaction', 'Charger logs', 'Alarm', 'Tariff']} onChanged={onChangeToggleOption} />
            {toggleOption === 0 ? <CPAction /> :
                toggleOption === 1 ? <CPConfig /> :
                    toggleOption === 2 ? <Transactions CPID={chargepointData && chargepointData.CPID} /> :
                        toggleOption === 3 ? <ChargerLog CPID={chargepointData && chargepointData.CPID} /> :
                            toggleOption === 4 ? <Alarm CPID={chargepointData && chargepointData.CPID} /> :
                                <Tariff CPID={chargepointData && chargepointData.CPID} id={chargepointData && chargepointData._id} />}
        </>
    )
}
