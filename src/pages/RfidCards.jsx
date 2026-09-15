import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import StyledTab from "../ui/styledTab";
import AllRfidCards from '../components/tagManagement/Rfid/AllRfidCards';
import AssignRfid from '../components/tagManagement/Rfid/AssignRfid';
import { useRfidList } from '../hooks/queries/useRfid';

const RfidCards = () => {
  const [togglePage, setTogglePage] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  // TanStack Query hook
  const { data: rfidListData, refetch } = useRfidList({ pageNo });

  // Extract data with safe defaults
  const rfidData = rfidListData?.result || [];
  const totalCount = rfidListData?.totalCount || 0;

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };

  return (
    <Box>
      <Stack direction={"row"} sx={{ backgroundColor: "secondary.main" }}>
        <StyledTab
          buttons={["All RFID cards", "Assign RFID"]}
          onChanged={buttonChanged}
        />
      </Stack>
      {togglePage === 0 ? <AllRfidCards data={rfidData} setPageNo={setPageNo} totalCount={totalCount} updateData={refetch} /> : <AssignRfid />}
    </Box>
  )
}

export default RfidCards
