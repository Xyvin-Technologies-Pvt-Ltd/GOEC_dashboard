import React from "react";
import StyledTable from "../ui/StyledTable.jsx";
import { DummyData } from "../assets/json/TableData";

import DashboardLayout from '../layout/dashboardLayout.jsx'

export default function Home() {

  const headers = [
    "OCCP Txn ID",
    "User Name",
    "Charge Station Name" ,
    "status"
  ];



  return (
      <DashboardLayout>
        <StyledTable headers={headers} data={DummyData} />
      </DashboardLayout>

  );
}