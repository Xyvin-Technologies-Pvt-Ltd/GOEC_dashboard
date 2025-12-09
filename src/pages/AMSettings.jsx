import React, { useState } from "react";

import { Box } from "@mui/material";
import AdminManangement from "../components/settings/adminManagement/adminManangement";
import { useAdminsList } from "../hooks/queries/useUser";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";

function AMSettings() {
  const [isChange, setIsChange] = useState(false);
  const tableHeader = ["Name", "Role", "Email", "Phone", "Designation", "Status"];
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading } = useAdminsList({ pageNo });
  const admins = data?.result || [];
  const totalCount = data?.totalCount || 1;

  const AllAdminData = tableHeaderReplace(
    admins,
    ["name", "role", "email", "phone", "designation", "status"],
    tableHeader
  );

  return (
    <Box>
      <AdminManangement
        headers={tableHeader}
        data={AllAdminData}
        setPageNo={setPageNo}
        totalCount={totalCount}
        setIsChange={setIsChange}
        isChange={isChange}
        loading={isLoading}
      />
    </Box>
  );
}

export default AMSettings;
