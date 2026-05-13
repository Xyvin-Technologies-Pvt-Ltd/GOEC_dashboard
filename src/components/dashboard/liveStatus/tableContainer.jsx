import React from 'react'
import StyledTable from '../../../ui/StyledTable'
import { tableHeaderReplace } from '../../../components/common/tableHeaderReplace'

const tableHeader = [
    'Charge Station',
    'Address',
    'Owner',
    'status'
]

export default function TableContainer({data}) {
    const chargeStationData = tableHeaderReplace(data, ['name', 'address', 'owner', 'charger_status'], tableHeader)
    return (
        <StyledTable headers={tableHeader} data={chargeStationData} showActionCell={false}/>
    )
}
