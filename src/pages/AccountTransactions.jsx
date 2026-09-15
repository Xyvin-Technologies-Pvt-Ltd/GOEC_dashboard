import { Box } from '@mui/material'
import React, { useState } from 'react'
import AccountTrans from '../components/accounts/accountTransaction/AccountTrans'
import { useTransactionList } from '../hooks/queries/useTransaction'

function AccountTransactions() {

  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filter = { pageNo };
  if(searchQuery){
    filter.searchQuery = searchQuery;
  }

  const { data: transactionData, refetch: refetchTransactionData } = useTransactionList(filter);
  const transactData = transactionData?.result || [];
  const totalCount = transactionData?.totalCount || 0;

  const getTaxData = () => {
    refetchTransactionData();
  }

  return (
    <Box>
      {transactData && <AccountTrans data={transactData} setPageNo={setPageNo} totalCount={totalCount} setSearchQuery={setSearchQuery} updateData={getTaxData} />}
    </Box>
  )
}

export default AccountTransactions