import React, { useState } from "react";
import { Box } from "@mui/material";
import ChargingTariff from "../components/tariff/chargingTariff/ChargingTariff.jsx";
import { useChargingTariffList } from "../hooks/queries/useChargingTariff.js";

export default function CTariff() {
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Use TanStack Query hook for charging tariff list
  const { data: tariffResponse = {} } = useChargingTariffList(pageNo, searchQuery);
  const tariffListData = tariffResponse.result ?? [];
  const totalCount = tariffResponse.totalCount ?? 0;

  const headers = [
    "Name",
    "Value",
    "Service fee(INR)",
    "Created on",
    "Last updated",
    "Tax",
  ];

  // Update data handler for manual refetch
  const updateData = () => {
    setIsChange(!isChange);
  };

  return (
    <Box>
      <ChargingTariff
        data={tariffListData}
        setSearchQuery={setSearchQuery}
        setPageNo={setPageNo}
        totalCount={totalCount}
        headers={headers}
        onIsChange={setIsChange}
        isChange={isChange}
        updateData={updateData}
      />
    </Box>
  );
}
