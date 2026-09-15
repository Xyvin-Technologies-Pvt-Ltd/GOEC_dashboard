import { Box } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/styledTable";
import { accountTransactionData } from "../../../assets/json/crm";
import { useWalletTransaction } from "../../../hooks/queries/useTransaction";
import { useLocation, useParams } from "react-router-dom";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";

function restructureData(dataArray) {
    return dataArray.map(item => ({
      _id: item._id,
      date: item.createdAt,
      type: item.type,
      transactionId: item.transactionId,
      amount: item.amount,
      status: item.status,
      paymentMode: "Online",
    }));
  }

const tableHeader = [
  "Date",
  "InvoiceType",
  "Transaction ID",
  "Total Amount",
  "Status",
  "Payment mode",
];

export default function UserAccountTransactiomn() {
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(1);

  const postData = {
    user: id,
  };
  const filters = { pageNo };

  const { data: transactionResponse } = useWalletTransaction(postData, filters);
  const transactionData = transactionResponse?.result || [];
  const totalCount = transactionResponse?.totalCount || 0;

  const transData = tableHeaderReplace(transactionData, ["createdAt","type", "transactionId", "amount", "status", "currency"], tableHeader);

  return (
    <Box>
      <LastSynced heading={"Account Transactions"} />
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <StyledTable
          headers={tableHeader}
          data={transData}
          showActionCell={true}
          actions={["view"]}
          onActionClick={(e) => {
          }}
          setPageNo={setPageNo} 
          totalCount={totalCount}
        />
      </Box>
    </Box>
  );
}
