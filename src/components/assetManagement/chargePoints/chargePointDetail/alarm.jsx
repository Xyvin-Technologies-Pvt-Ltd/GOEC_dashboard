import React, { useEffect } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { ReactComponent as ReloadIcon } from '../../../../assets/icons/reload.svg'
import StyledSearchField from '../../../../ui/styledSearchField'
import { Tune, FileDownloadOutlined } from '@mui/icons-material'
import StyledTable, { TableHeader } from '../../../../ui/styledTable'
import { alarmData } from '../../../../assets/json/chargepoints'
import { useState } from 'react'
import { useAlarmsById } from '../../../../hooks/queries/useOcpp'
import LastSynced from '../../../../layout/LastSynced'
import { tableHeaderReplace } from '../../../../utils/tableHeaderReplace'
import { searchAndFilter } from '../../../../utils/search'
import RightDrawer from '../../../../ui/RightDrawer'
import Filter from './alarm/filter'

const StyledIconButton = ({ icon, ...props }) => {
    return (
        <Stack sx={{ backgroundColor: '#322F3B', px: 2, justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }} props>
            {icon && icon}
        </Stack>
    )
}

const tableHeader = [
    'CPID',
    'Generated on',
    'Summary',
    'Connector ID',
    'Connector status',
    'Error code'
]


export default function Alarm({ CPID }) {
    const [searchQuery, setSearchQuery] = useState('');


    const [alarmList, setAlarmList] = useState([])
    const [pageNo, setPageNo] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const filter = {
        pageNo,
        ...(searchQuery && { searchQuery }),
    };

    const { data: alarmsData = {}, refetch } = useAlarmsById(CPID, filter, !!CPID);

    // derive list and totalCount from hook data
    const derivedAlarmList = alarmsData.result || [];
    const derivedTotalCount = alarmsData.totalCount || 0;

    // keep a simple init function for Filter component to update pagination/search
    const init = (dt = { pageNo }) => {
        if (dt.pageNo !== undefined) setPageNo(dt.pageNo);
        if (dt.searchQuery !== undefined) setSearchQuery(dt.searchQuery);
    };

    // sync derived values into local state for compatibility with table props
    useEffect(() => {
        setAlarmList(tableHeaderReplace(derivedAlarmList, ['cpid', 'date', 'summary', 'connectorId', 'status', 'errorCode'], tableHeader));
        setTotalCount(derivedTotalCount);
    }, [derivedAlarmList, derivedTotalCount]);

    return (
        <>
            <LastSynced heading="Alarms" reloadHandle={() => refetch()}>
                <StyledSearchField placeholder={'Search'} onChange={(e) => {
                    setSearchQuery(e.target.value)
                }} />
                <RightDrawer>
                    <Filter onSubmited={init} />
                </RightDrawer>
            </LastSynced>
            <Box sx={{ p: 3, overflow: 'scroll' }}>
                <StyledTable headers={tableHeader} setPageNo={setPageNo} totalCount={totalCount} data={alarmList} showActionCell={false} />
            </Box>
        </>
    )
}
