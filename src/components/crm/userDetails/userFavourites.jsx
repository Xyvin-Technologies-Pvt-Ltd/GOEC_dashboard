import { Box } from "@mui/material";
import React, { useState } from "react";
import LastSynced from "../../../layout/LastSynced";
import StyledTable from "../../../ui/styledTable";
// import { favouritesData } from "../../../assets/json/crm";
import {  useParams } from "react-router-dom";
import { useUserFavourites } from "../../../hooks/queries/useUser";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";

const tableHeader = ["ChargeStation", "Address", "Longitude", "Latitude", "Owner"];

export default function UserFavourites() {
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(1);

  const filters = { pageNo };

  const { data: favouritesData } = useUserFavourites(id, filters);
  const favourites = favouritesData?.result || [];
  const totalCount = favouritesData?.totalCount || 0;

  const tableData = tableHeaderReplace(
    favourites,
    ["chargingStationName", "address", "longitude", "latitude", "owner"],
    tableHeader
  );

  return (
    <Box>
      <LastSynced heading={"Favourites"} />
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <StyledTable
          headers={tableHeader}
          data={tableData}
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
