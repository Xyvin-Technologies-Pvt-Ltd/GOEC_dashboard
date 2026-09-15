import React, { useState, useMemo } from "react";
import AllChargingTransactions from "../components/chargingNetwork/chargingTransaction/AllChargingTransactions";
import { ChargingTransactionDummyData } from "../assets/json/ChargingTransactionData";
import { useOcppTransactionLogs } from "../hooks/queries/useOcpp";

export default function ChargingTransactions() {
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Build filter object with localStorage support
  const filters = useMemo(() => {
    const filterStore = localStorage.getItem('filter');
    let filter = { pageNo };

    if (filterStore) {
      const cfilter = JSON.parse(filterStore);
      cfilter.pageNo = pageNo;
      filter = { ...cfilter };
    }

    if (searchQuery) {
      filter.searchQuery = searchQuery;
    }

    return filter;
  }, [pageNo, searchQuery]);

  // TanStack Query hook
  const { data: transactionLogsData, refetch } = useOcppTransactionLogs(filters);

  // Extract data with safe defaults
  const logs = transactionLogsData?.result || [];
  const totalCount = transactionLogsData?.totalCount || 0;

  return (
    <div>
      <AllChargingTransactions
        data={logs}
        updateData={refetch}
        setPageNo={setPageNo}
        totalCount={totalCount}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
