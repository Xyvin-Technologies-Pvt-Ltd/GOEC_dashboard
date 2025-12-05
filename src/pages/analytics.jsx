import { Box } from '@mui/material'
import React, { useState } from 'react'
import StyledTab from '../ui/styledTab'
import Overview from '../components/dashboard/analytics/overview'
import Trends from '../components/dashboard/analytics/trends'
import Utilization from '../components/dashboard/analytics/utilization'
import { useDashboardAnalytics } from '../hooks/queries/useOcpp'

export default function Analytics() {
  const [tabIndex, setTabIndex] = useState(0)

  // TanStack Query hook - automatically refetches every 10 seconds
  const { data: analyticsData } = useDashboardAnalytics();

  // Extract data with safe defaults
  const overviewData = analyticsData?.result;

  const tabOnChange = (e) => {
    setTabIndex(e.index)
  }
  return (
    <Box>
      <StyledTab buttons={['Overview', 'Trends', 'Utilization']} onChanged={tabOnChange} />
      <Box>
        {tabIndex === 0 ? <Overview data={overviewData} /> : tabIndex === 1 ? <Trends /> : <Utilization />}
      </Box>
    </Box>
  )
}
