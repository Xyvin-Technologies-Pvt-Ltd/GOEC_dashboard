import React, { useState } from "react";

import AdminManangement from "../components/settings/adminManagement/adminManangement";
import { useAdminsList } from "../hooks/queries/useUser";
import { tableHeaderReplace } from "../components/common/tableHeaderReplace";

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
    <div className="w-full">
      <AdminManangement
        headers={tableHeader}
        data={AllAdminData}
        setPageNo={setPageNo}
        totalCount={totalCount}
        setIsChange={setIsChange}
        isChange={isChange}
        loading={isLoading}
      />
    </div>
  );
}

export default AMSettings;
