import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledSearchField from "../../../ui/StyledSearchField";
import { Box } from "@mui/material";
import StyledTable from "../../../ui/StyledTable";
import { searchAndFilter } from "../../../components/common/search";
import { DummyData } from "../../../assets/json/AccountTransactions";
import RightDrawer from "../../../ui/RightDrawer";
import { tableHeaderReplace } from "../../../components/common/tableHeaderReplace";
import Filter from "../filter";


const tableHeader = [
  'User name',
  'Mobile',
  'Date',
  'Invoice Type',
  'Invoice ID',
  'Total Amount',
  'Status',
  'Initiated By',
  'Order ID',
  'Reference',
]


export default function AccountTrans({ data,updateData, setPageNo, totalCount, setSearchQuery }) {

  const accData = tableHeaderReplace(data, ["user", "mobile", "createdAt", "type", "invoice_id", "amount", "status", "initiated_by", "transactionId", "reference"], tableHeader);
  const tableActionClick = (e) => {
  };

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>
      <LastSynced heading="Account Transactions"reloadHandle={updateData} >
        <StyledSearchField
          placeholder={"Search"}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {/* <RightDrawer>
          <Filter onSubmited={updateData} />
        </RightDrawer> */}
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable
          headers={tableHeader}
          data={accData}
          setPageNo={setPageNo}
          totalCount={totalCount}
          onActionClick={tableActionClick}
          actions={["Download Invoice","Resend Mail"]}
        />
      </Box>
    </>
  );
}
