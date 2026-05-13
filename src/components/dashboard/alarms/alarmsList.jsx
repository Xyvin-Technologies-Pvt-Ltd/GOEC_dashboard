import React, { useState } from 'react'
import LastSynced from '../../../layout/LastSynced'
import StyledSearchField from '../../../ui/StyledSearchField'
import { Box, IconButton } from '@mui/material'
import { Tune } from '@mui/icons-material'
import StyledTable from '../../../ui/StyledTable'
import { searchAndFilter } from '../../../components/common/search'
import { tableHeaderReplace } from '../../../components/common/tableHeaderReplace'
import RightDrawer from '../../../ui/RightDrawer'
import Filter from './filter'


const tableHeader = [
  'CPID',
  'Generated on',
  'Summary',
  'Connector ID',
  'Connector status',
  'Error code'
]

export default function AlarmsList({data, dataReload, setPageNo, totalCount, setSearchQuery }) {

  const handleSearch = (value)=>{
    setSearchQuery(value)
}
  const tabledata = tableHeaderReplace(data,['cpid','date','summary','connectorId','status','errorCode'],tableHeader)

  return (
    <>
      <LastSynced heading="Charge Points" reloadHandle={dataReload}>
        <StyledSearchField placeholder={'Search'} onChange={(e) => {
          handleSearch(e.target.value)
        }} />
        <RightDrawer>
          <Filter onSubmited={dataReload}/>
        </RightDrawer>
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader} data={tabledata} setPageNo={setPageNo} totalCount={totalCount} showActionCell={false} />
      </Box>
    </>
  )
}
