import React, { useState } from 'react'
import LastSynced from '../../../layout/LastSynced'
import { Box, IconButton } from '@mui/material'
import { Tune } from '@mui/icons-material'
import { Bar } from 'react-chartjs-2'
import { useDashboardUtilization } from '../../../hooks/queries/useOcpp'
import RightDrawer from '../../../ui/RightDrawer'
import Filter from './trends/filter'


const datas = [
    { value1: 70, value2: 40, label: 'January' },
    { value1: 30, value2: 50, label: 'February' },
    { value1: 25, value2: 60, label: 'March' },
    { value1: 45, value2: 30, label: 'April' },
    { value1: 28, value2: 67, label: 'May' },
    { value1: 63, value2: 23, label: 'June' },
    { value1: 54, value2: 57, label: 'July' },
    { value1: 37, value2: 63, label: 'August' },
];

export default function Utilization() {
    const [filter, setFilter] = useState({})

    // TanStack Query hook
    const { data: utilizationData, refetch } = useDashboardUtilization(filter)

    // Extract data with safe defaults
    const trendsUtilization = utilizationData?.result || []

    const handleFilterSubmit = (newFilter) => {
        setFilter(newFilter)
    }

    const data = {

        datasets: [
            {
                label: 'Energy Delivered(kWh)',
                backgroundColor: '#DF5BCA',
                data: trendsUtilization?.map((e) => e.value1),
            },
            {
                label: 'Revenue(INR)',
                backgroundColor: '#574CA6',
                data: trendsUtilization?.map((e) => e.value2),
            }
        ],
        labels: trendsUtilization?.map((e) => e.label)
    };

    const options = {
        animation: true,
        responsive: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        plugins: {
            legend: {
                display: true
            },
        },
        scales: {
            y: {
                grid: {
                    drawBorder: true,
                    color: '#FFF2',
                },
                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    fontSize: 12,
                }
            },
            x: {
                grid: {
                    drawBorder: true,
                    color: '#FFF2',
                },
                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    fontSize: 12,
                }
            }
        },
    };


    return (
        <>
            <LastSynced heading={'Analytics - Utilization'}>
                <RightDrawer >
                    <Filter onSubmited={handleFilterSubmit} />
                </RightDrawer>
            </LastSynced>
            <Box sx={{ backgroundColor: 'secondary.main', borderRadius: '4px', height: { xs: 250, md: 350 }, p: { xs: 1, md: 2 }, m: { xs: 1, md: 2 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Bar data={data} options={options} />
            </Box>
        </>
    )
}
