import { Box } from '@mui/material'
import React, { useState } from 'react'
import StyledTab from '../ui/styledTab'
import AlarmsList from '../components/dashboard/alarms/alarmsList'
import AlarmSummary from '../components/dashboard/alarms/alarmSummary'
import { useAlarms, useAlarmSummary } from '../hooks/queries/useOcpp'

export default function Alarms() {
  const [tabIndex, setTabIndex] = useState(0)
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Build filter object
  const alarmFilters = {
    pageNo,
    ...(searchQuery && { searchQuery })
  };

  // TanStack Query hooks
  const { data: alarmsData, refetch: refetchAlarms } = useAlarms(alarmFilters);
  const { data: alarmSummaryData, refetch: refetchAlarmSummary } = useAlarmSummary();

  // Extract data with safe defaults
  const alarmList = alarmsData?.result || [];
  const totalCount = alarmsData?.totalCount || 0;
  const summaryData = alarmSummaryData?.result;

  const tabOnChange = (e) => {
    setTabIndex(e.index)
  }

  return (
    <Box>
      <StyledTab buttons={['Alarms', 'Alarm Summary']} onChanged={tabOnChange} />
      <Box>
        {tabIndex === 0 ? <AlarmsList data={alarmList} dataReload={refetchAlarms} setPageNo={setPageNo} totalCount={totalCount} setSearchQuery={setSearchQuery} /> : (summaryData && <AlarmSummary data={summaryData} dataReload={refetchAlarmSummary} />)}
      </Box>
    </Box>
  )
}
