import { Box } from '@mui/material'
import React from 'react'
import { Line } from 'react-chartjs-2';


let width, height, gradient;
function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, '#5F5DD7B5');
        gradient.addColorStop(0.5, '#ED5DCD');
    }

    return gradient;
}

// const datas = [
//     { value: 70, label: '16-02-2023' },
//     { value: 20, label: '16-02-2023' },
//     { value: 15, label: '16-02-2023' },
//     { value: 10, label: '16-02-2023' },
//     { value: 0, label: '16-02-2023' },
//     { value: 0, label: '16-02-2023' },
//     { value: 0, label: '16-02-2023' },
//     { value: 0, label: '16-02-2023' },
// ];

export default function Revenue({trendsData}) {

    const data = {

        datasets: [
            {
                axis: 'y',
                data: trendsData?.map((e) => e.total),
                pointBackgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                borderColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                }
            },
        ],
        labels: trendsData?.map((e) => e.date)
    };

    const options = {
        animation: true,
        responsive: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Revenue (NPR)",
                    color: '#fff',
                    padding: { top: 20, left: 0, right: 0, bottom: 20 }
                },
                grid: {
                    drawBorder: true,
                    color: '#FFF3',
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
                    color: '#FFF3',
                },
                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    fontSize: 12,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }
    };


    return (
        <Box sx={{ backgroundColor: 'secondary.main', height: { xs: 250, md: 500 }, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Line data={data} options={options} />
        </Box>
    )
}
