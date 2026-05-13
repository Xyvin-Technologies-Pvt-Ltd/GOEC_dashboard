import { Box, Dialog } from '@mui/material';
import React, { useState } from 'react'
import LastSynced from '../../../../layout/LastSynced';
import StyledTable from '../../../../ui/StyledTable';
import { VIDData } from '../../../../assets/json/crm';
import AssignVID from './assignVID';
import { Transition } from '../../../../ui/DialogAnimation';

const tableHeader = [
    'RFID tag',
    'Created on',
    'Expires on',
    'Validity',
    'Status'
]

export default function VID() {
    const [open,setopen] = useState(false)
    return (
        <Box>
             <Dialog fullWidth maxWidth={'md'} open={open} onClose={()=>{setopen(false)}} TransitionComponent={Transition}>
                <AssignVID />
            </Dialog>
            <LastSynced heading={'Assigned VID'} showButton={true} handleClick={()=>{setopen(true)}}/>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
                <StyledTable headers={tableHeader} data={VIDData} showActionCell={true} actions={['Unassign', 'view', 'Delete']} onActionClick={(e) => { /*console.log(e);*/ }} />
            </Box>
        </Box>
    )
}