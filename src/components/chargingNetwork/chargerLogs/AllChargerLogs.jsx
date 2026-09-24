import React, { useEffect } from 'react';
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/styledTable";
import { Box } from "@mui/material";
import { tableHeaderReplace } from '../../../utils/tableHeaderReplace';
import StyledSearchField from '../../../ui/styledSearchField';
import RightDrawer from '../../../ui/RightDrawer';
import Filter from '../filter';
import { searchAndFilter } from '../../../utils/search';
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
