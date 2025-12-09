import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import StyledSearchField from '../../../ui/styledSearchField'
import StyledTable from '../../../ui/styledTable'
import { ReactComponent as ReloadIcon } from '../../../assets/icons/reload.svg'


// import { AllChargePointsData } from '../../../assets/json/chargepoints'
import LastSynced from '../../../layout/LastSynced'
import { useNavigate } from 'react-router-dom'
import { searchAndFilter } from '../../../utils/search'
import { tableHeaderReplace } from '../../../utils/tableHeaderReplace'
import { permissions } from '../../../core/routes/permissions'
import { useAuthStore } from '../../../store'

const tableHeader = [
  'CPID',
  'OEM',
  'Model',
  'Tariff',
  'Station',
  'Status',
  'Published'
]

export default function AllChargePoint({ data, setPageNo, setSearchQuery, totalCount, deleteData, editData, reloadData, ...props }) {
  const navigate = useNavigate()
  const hasPermission = useAuthStore((state) => state.hasPermission)

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  const tableActionClick = (e) => {
    if (e.action === 'View') {
      navigate(`/charge-point-detail/${e.data._id}`)
    }
    else if (e.action === 'Edit') {
      editData(e.data)
    }
    else if (e.action === 'Delete') {
      deleteData(e.data)
    }
  }
  const AllChargePointsData = tableHeaderReplace(data, ['CPID', 'oem', 'evModel', 'chargingTariff', 'chargingStation', 'cpidStatus', 'published'], tableHeader)

  return (
    <>
      <LastSynced heading="Charge Points" reloadHandle={reloadData} >
        <StyledSearchField placeholder={'Search'} onChange={(e) => {
          handleSearch(e.target.value)
        }} />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader}
          data={AllChargePointsData}
          showActionCell={true}
          setPageNo={setPageNo}
          totalCount={totalCount}
          actions={hasPermission(permissions.chargePoint.modify) ? ["Edit", "View", "Delete"] : ["View"]}
          onActionClick={tableActionClick} />
      </Box>
    </>
  )
}
