import React, { useState } from "react";
import AllChargerLogs from "../components/chargingNetwork/chargerLogs/AllChargerLogs";
import AllLogs from "../components/logs/AllLogs";
import { useServerLogs } from "../hooks/queries/useLogs";

export default function Logs() {
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filter = {
    pageNo,
    ...(searchQuery && { searchQuery }),
  };

  const { data: logsData = {}, refetch } = useServerLogs(filter);
  const logs = logsData.result || [];
  const totalCount = logsData.totalCount || 0;

  const handleUpdateData = () => {
    refetch();
  };

  return (
    <div>
      <AllLogs
        data={logs}
        updateData={handleUpdateData}
        setPageNo={setPageNo}
        totalCount={totalCount}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
