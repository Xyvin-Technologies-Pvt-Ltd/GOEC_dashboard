import React from "react";
import StyledTable from "../ui/StyledTable.jsx";
import { DummyData } from "../assets/json/TableData";
import DashboardLayout from "../layout/dashboardLayout.jsx";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";

const headers = ["OCCP Txn ID", "User Name", "Charge Station Name", "status"];

export default function Home() {
  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader title="Dashboard" subtitle="Live charge transaction overview" />
        <StyledTable headers={headers} data={DummyData} />
      </PageContainer>
    </DashboardLayout>
  );
}
