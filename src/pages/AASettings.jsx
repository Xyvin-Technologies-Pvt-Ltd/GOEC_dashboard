import { DummyData } from "../assets/json/AdminActivityData";
import AdminActivity from "../components/settings/adminActivity/adminActivity";
import { useState } from "react";

function AASettings() {
  const tableHeader = [
    "Admin Name",
    "Role",
    "Session start time",
    "Session Finish time",
    "Session Device",
    "Session IP",
  ];

  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(1);



  return (
    <div className="w-full">
      <AdminActivity headers={tableHeader} data={DummyData} setPageNo={setPageNo} totalCount={totalCount}/>
    </div>
  );
}

export default AASettings;
