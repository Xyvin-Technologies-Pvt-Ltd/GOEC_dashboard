import { Box } from '@mui/material'
import React, { useState } from 'react'
import StyledTable from '../../../ui/StyledTable'
import LastSynced from '../../../layout/LastSynced'
import { useNavigate } from 'react-router-dom'
import StyledSearchField from '../../../ui/StyledSearchField'
import { searchAndFilter } from '../../../components/common/search'
import { tableHeaderReplace } from '../../../components/common/tableHeaderReplace'
import { permissions } from '../../../routes/permissions'
import { useAuthStore } from '../../../store'


const tableHeader = [
  'Charge Station',
  'Address',
  'Longitude',
  'Latitude',
  'Owner'
]

export default function AllChargeStation({ data, setPageNo, totalCount, setSearchQuery, deleteData, editData, reloadData, ...props }) {
  const navigate = useNavigate()
  const hasPermission = useAuthStore((state) => state.hasPermission)


  const handleSearch = (value) => {
    setSearchQuery(value)
  }
  const chargeStationData = tableHeaderReplace(data, ['name', 'address', 'longitude', 'latitude', 'owner', 'status'], tableHeader)
  const tableActionClick = (e) => {
    if (e.action === 'View') {
      navigate(`/charge-station-detail/${e.data._id}`)
    } else if (e.action === 'Delete') {
      deleteData(e.data)
    } else if (e.action === 'Edit') {
      editData(e.data)
    }
  }
  return (
    <>

      <LastSynced heading="Charge Stations" reloadHandle={reloadData} >
        <StyledSearchField placeholder={'Search'} onChange={(e) => {
          handleSearch(e.target.value)
        }} />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader}
          setPageNo={setPageNo}
          totalCount={totalCount}
          data={chargeStationData}
          actions={hasPermission(permissions.chargingStations.modify) ? ["Edit", "View", "Delete"] : ["View"]}
          onActionClick={tableActionClick} />
      </Box>
    </>
  )
}
