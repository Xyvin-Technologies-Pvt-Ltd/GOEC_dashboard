import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledSearchField from "../../../ui/StyledSearchField";
import { Box } from "@mui/material";
import StyledTable from "../../../ui/StyledTable";
import { searchAndFilter } from "../../../components/common/search";
import { DummyData } from "../../../assets/json/BookingTransactions";
import RightDrawer from "../../../ui/RightDrawer";

export default function BookingTrans() {
  const [filterValue, setFilterValue] = useState("");

  const tableActionClick = (e) => {
  };

  const tableHeader = [
    'Booking Id',
    'CPID',
    'Connector Id',
    'Booked Through',
    'User Number',
    'User Name',
    'Booking Time',
  ]

  return (
    <>
      <LastSynced heading="Booking Transactions">
        <StyledSearchField
          placeholder={"Search"}
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        />
        <RightDrawer />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable
          headers={tableHeader}
          data={searchAndFilter(DummyData, filterValue)}
          onActionClick={tableActionClick}
        />
      </Box>
    </>
  );
}
