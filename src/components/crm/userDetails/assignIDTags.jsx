import { Box } from '@mui/material'
import React, { useState } from 'react'
import StyledTab from '../../../ui/StyledTab'
import RFID from './assignIDTags/RFID'
import VID from './assignIDTags/VID'

export default function AssignIDTags() {
    const [tabIndex,setTabIndex] = useState(0)
  return (
    <Box>
        <StyledTab buttons={['RFID','VID']} onChanged={(e)=>{setTabIndex(e.index)}}/>
        {tabIndex == 0 ? <RFID/> : <VID/>}
    </Box>
  )
}
