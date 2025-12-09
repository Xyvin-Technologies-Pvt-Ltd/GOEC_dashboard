import React, { useState } from 'react'
import LastSynced from '../../../layout/LastSynced'
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Tune } from '@mui/icons-material'
import DashboardDataCard from '../../../ui/dashboardDataCard'
import Revenue from './trends/revenue'
import ChargingTransaction from './trends/chargingTransaction'
import Energy from './trends/energy'
import RightDrawer from '../../../ui/RightDrawer'
import Filter from './trends/filter'
import { useDashboardTrends } from '../../../hooks/queries/useOcpp'


const buttons = [
    'Revenue (INR)',
    'Charging Transactions',
    'Energy'
]

export default function Trends() {
    const [buttonIndex, setbuttonIndex] = useState(0)
    const [filter, setFilter] = useState({})

    // TanStack Query hook
    const { data: trendsData, refetch } = useDashboardTrends(filter)

    // Extract data with safe defaults
    const trendsRevenue = trendsData?.revenue || []
    const trendsChargingTransactions = trendsData?.chargingTransactions || []
    const trendsEnergy = trendsData?.energy || []
    const totalRevenue = trendsData?.totalRevenue?.toFixed(2) || "Loading..."
    const totalCount = trendsData?.totalCount || "Loading..."
    const totalUnit = trendsData?.totalUnit?.toFixed(2) || "Loading..."

    const handleFilterSubmit = (newFilter) => {
        setFilter(newFilter)
    }

    return (
        <>

            <LastSynced heading={'Analytics - Trends'}>
                <RightDrawer >
                    <Filter onSubmited={handleFilterSubmit} />
                </RightDrawer>
            </LastSynced>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'Revenue'} subTitle={'Earned(INR)'} value={totalRevenue} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'Energy'} subTitle={'Delivered (kWh)'} value={totalUnit} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'Charging'} subTitle={'Transactions'} value={totalCount} />
                    </Grid>
                </Grid>
                <Stack direction={'row'} spacing={1} p={2}>
                    {
                        buttons.map((item, ind) => (
                            <Button
                                key={ind}
                                sx={{
                                    backgroundColor: buttonIndex == ind ? 'secondary.button' : 'secondary.main',
                                    width: '200px', height: '40px', border: '1px solid #fff6', borderRadius: '4px',
                                    color: buttonIndex == ind ? '#fff' : 'secondary.contrastText',
                                    fontWeight: 400
                                }}
                                onClick={() => { setbuttonIndex(ind) }}
                            >
                                {item}
                            </Button>
                        ))
                    }
                </Stack>
                {buttonIndex == 0 ? <Revenue trendsData={trendsRevenue} /> : buttonIndex == 1 ? <ChargingTransaction trendsDate={trendsChargingTransactions} /> : <Energy trendsData={trendsEnergy} />}
                <Typography variant='subtitle2' color={'secondary.contrastText'} my={2}>Authorized by</Typography>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'Mobile'} value={59} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'RFID'} value={128} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'Offline Transaction'} value={59} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'CPO assistances'} value={59} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DashboardDataCard title={'VID'} value={59} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}