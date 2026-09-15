import { Box } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/styledTable";
import { chargingTransactionData } from "../../../assets/json/crm";
import { useParams } from "react-router-dom";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";
import { useChargingHistory } from "../../../hooks/queries/useOcpp";

const tableHeader = [
  "Transaction ID",
  "Units Consumed",
  "Location Name",
  "Duration(hh:mm:ss)",
  "chargepoint ID",
  "Connector ID",
  "Total Amount",
  "Close by",
];

export default function UserChargingTransaction() {
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(1);

  // TanStack Query hook
  const { data: chargingHistoryData, refetch } = useChargingHistory(
    id,
    {},
    { pageNo }
  );

  const chargingTransaction = chargingHistoryData?.result || [];
  const totalCount = chargingHistoryData?.totalCount || 0;

  const transData = tableHeaderReplace(
    chargingTransaction,
    [
      "transactionId",
      "unitConsumed",
      "stationAddress",
      "duration",
      "chargingPoint",
      "connectorId",
      "amount",
      "closeBy",
    ],
    tableHeader
  );

  return (
    <Box>
      <LastSynced heading={"Charging Transactions"} showSearchField={true} reloadHandle={refetch} />
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <StyledTable
          headers={tableHeader}
          data={transData}
          showActionCell={true}
          actions={["view"]}
          onActionClick={(e) => { }}
          setPageNo={setPageNo}
          totalCount={totalCount}
        />
      </Box>
    </Box>
  );
}
