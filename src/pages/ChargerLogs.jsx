import React, { useState, useMemo } from "react";
import AllChargerLogs from "../components/chargingNetwork/chargerLogs/AllChargerLogs";
import { useOcppLogs } from "../hooks/queries/useOcpp";

export default function ChargerLogs() {
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
  const { data: logsData, refetch } = useOcppLogs(filters);

  // Extract data with safe defaults
  const logs = logsData?.result || [];
  const totalCount = logsData?.totalCount || 0;

  return (
    <div>
      <AllChargerLogs data={logs} updateData={refetch} setPageNo={setPageNo} totalCount={totalCount} setSearchQuery={setSearchQuery} />
    </div>
  );
}
