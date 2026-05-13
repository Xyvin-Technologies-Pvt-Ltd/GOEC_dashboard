import React, { useEffect } from 'react';
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/StyledTable";
import { Box } from "@mui/material";
import { tableHeaderReplace } from '../../../components/common/tableHeaderReplace';
import StyledSearchField from '../../../ui/StyledSearchField';
import RightDrawer from '../../../ui/RightDrawer';
import Filter from '../filter';
import { searchAndFilter } from '../../../components/common/search';
import { useState } from 'react';
import Indicator from '../../assetManagement/chargePoints/chargePointDetail/indicator';

const tableHeader = [
  "CPID",
  "Date",
  "Command",
  "Payload Data",
  "Unique ID"
];

export default function AllChargerLogs({ data, updateData, setPageNo, totalCount, setSearchQuery }) {
  
  const AllLogsData = tableHeaderReplace(data, ['CPID', 'createdAt', 'messageType', 'payload', '_id'], tableHeader)
  
  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>

      <LastSynced heading="Charger Logs" reloadHandle={updateData} >
      <StyledSearchField placeholder={'Search'} onChange={(e) => {
                    handleSearch(e.target.value)
                }} />
                <RightDrawer>
                    <Filter onSubmited={updateData} />
                </RightDrawer>
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable
          showActionCell={false}
          headers={tableHeader}
          data={AllLogsData}
          setPageNo={setPageNo}
          totalCount={totalCount}
        />
        <Indicator />
      </Box>


    </>
  )
}
