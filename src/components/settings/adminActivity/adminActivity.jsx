import React from "react";
import LastSynced from "../../../layout/LastSynced";
import { Box } from "@mui/material";
import StyledTable from "../../../ui/StyledTable";

export default function AdminActivity({ data, headers, setPageNo, totalCount  }) {
  return (
    <>
      <LastSynced heading="Admin Activity" showSearchField={true} />
      <Box sx={{ p: 3 }}>
        <StyledTable headers={headers} data={data} setPageNo={setPageNo} totalCount={totalCount} showActionCell={false}/>
      </Box>
    </>
  );
}
