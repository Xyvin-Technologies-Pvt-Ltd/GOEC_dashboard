import LastSynced from "../../layout/LastSynced.jsx";
import StyledTable from "../../ui/StyledTable.jsx";
import { Box } from "@mui/material";
import { tableHeaderReplace } from "../../components/common/tableHeaderReplace";
import StyledSearchField from "../../ui/StyledSearchField";

const tableHeader = ["Label", "Date", "level", "message", "Unique ID"];

export default function AllLogs({ data, updateData, setPageNo, totalCount, setSearchQuery }) {
  const AllLogsData = tableHeaderReplace(
    data,
    ["label", "timestamp", "level", "message", "_id"],
    tableHeader
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <>
      <LastSynced heading="Server Logs" reloadHandle={updateData}>
        <StyledSearchField
          placeholder={"Search"}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable
          showActionCell={false}
          headers={tableHeader}
          data={AllLogsData}
          setPageNo={setPageNo}
          totalCount={totalCount}
        />
      </Box>
    </>
  );
}
