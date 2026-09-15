import React, { useState } from 'react'
import { Box, Stack } from '@mui/material'
import StyledSearchField from '../../../../ui/styledSearchField'
import { Tune, FileDownloadOutlined } from '@mui/icons-material'
import StyledTable from '../../../../ui/styledTable'
import LastSynced from '../../../../layout/LastSynced'
import { searchAndFilter } from '../../../../utils/search'
import { useEffect } from 'react'
import { useTransactionById } from '../../../../hooks/queries/useOcpp'
import { tableHeaderReplace } from '../../../../utils/tableHeaderReplace'
import TransactionDetails from './transaction/transactionDetails'
import RightDrawer from '../../../../ui/RightDrawer'
import Filter from './chargerLog/filter'
import { exportExcelData } from '../../../../utils/excelExport'
import StyledIconButton from '../../../../ui/stylediconButton'

const tableHeader = [
    'Transaction ID',
    'Date',
    'Username',
    'Transaction Mode',
    'Units Consumed',
    'Location Name',
    'Duration(hh:mm:ss)',
    'Chargepoint ID',
    'Total Amount',
    'CP Stop txn reason',
    // 'Closed by'

]


export default function Transactions({ CPID }) {
    const [transactionList, setTransactionList] = useState([])
    const [detailOpen, setDetailOpen] = useState(false)
    const [pageNo, setPageNo] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [transaction, setTransaction] = useState();
    const filter = {
        pageNo,
        ...(searchQuery && { searchQuery }),
    };

    const { data: txData = {}, refetch } = useTransactionById(CPID, filter, !!CPID);

    const derivedTxList = txData.result || [];
    const derivedTotal = txData.totalCount || 0;

    useEffect(() => {
        setTransactionList(tableHeaderReplace(derivedTxList, ['transactionId', 'date', 'username', 'transactionMode', 'unitConsumed', 'location', 'duration', 'chargePointId', 'totalAmount', 'closureReason'], tableHeader));
        setTotalCount(derivedTotal);
    }, [derivedTxList, derivedTotal]);

    const init = (dt = { pageNo }) => {
        if (dt.pageNo !== undefined) setPageNo(dt.pageNo);
        if (dt.searchQuery !== undefined) setSearchQuery(dt.searchQuery);
    };

    const actionclickHandle = (e) => {
        if (e.action === 'View') {
            setTransaction(e.data)
            setDetailOpen(true)
        }
    }
    return (
        <>
            <TransactionDetails data={transaction} open={detailOpen} onClose={() => { setDetailOpen(false) }} />
            <LastSynced heading={'Transactions'} reloadHandle={init}>
                <StyledSearchField placeholder={'Search'} onChange={(e) => {
                    setSearchQuery(e.target.value)
                }} />
                <RightDrawer>
                    <Filter onSubmited={init} />
                </RightDrawer>
                <StyledIconButton icon={<FileDownloadOutlined sx={{ color: 'secondary.contrastText', cursor: 'pointer' }} />}
                    onClick={() => { exportExcelData(transactionList, "Transaction") }}
                />
            </LastSynced>
            <Box sx={{ p: 3 }}>
                <StyledTable headers={tableHeader} data={transactionList} setPageNo={setPageNo} totalCount={totalCount} actions={['Resend email', 'Download Invoice ', 'View']} onActionClick={actionclickHandle} />
            </Box>
        </>
    )
}
