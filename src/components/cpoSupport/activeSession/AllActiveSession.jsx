import { Box } from "@mui/material";
import React from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/StyledTable";

export default function ActiveSession({ data, tableHeader, dataReload, isLoading = false }) {
  return (
    <>
      <LastSynced heading="Active Sessions" showSearchField={true} reloadHandle={dataReload} />
      <Box sx={{ p: 3 }}>
        <StyledTable
          headers={tableHeader}
          data={data}
          showActionCell={false}
          isLoading={isLoading}
          onRemoteStopSuccess={dataReload}
        />
      </Box>
    </>
  );
}
