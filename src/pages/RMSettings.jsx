import React, { useState } from "react";
import RoleManagement from "../components/settings/roleManagement/roleManagement";
import { useRolesList } from "../hooks/queries/useUser";
import { tableHeaderReplace } from "../components/common/tableHeaderReplace";

function RMSettings() {
  const [isChange, setIsChange] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading } = useRolesList({ pageNo });
  const roles = data?.result || [];
  const totalCount = data?.totalCount || 1;

  const tableHeader = [
    "Role name",
    "Created on",
    "Access Type",
    "Role Description",
    "Status",
  ];

  const AllRoleData = tableHeaderReplace(
    roles,
    ["roleName", "createdOn", "accessType", "description", "status"],
    tableHeader
  );

  return (
    <div className="w-full">
      <RoleManagement
        headers={tableHeader}
        setPageNo={setPageNo}
        totalCount={totalCount}
        data={AllRoleData}
        setIsChange={setIsChange}
        isChange={isChange}
        loading={isLoading}
      />
    </div>
  );
}

export default RMSettings;
