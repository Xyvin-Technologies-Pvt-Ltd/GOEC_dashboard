import React, { useState } from "react";
import StyledTab from "../ui/StyledTab";
import Overview from "../components/dashboard/analytics/overview";
import Trends from "../components/dashboard/analytics/trends";
import Utilization from "../components/dashboard/analytics/utilization";
import { useDashboardAnalytics } from "../hooks/queries/useOcpp";

export default function Analytics() {
  const [tabIndex, setTabIndex] = useState(0);

  const { data: analyticsData } = useDashboardAnalytics();

  const overviewData = analyticsData?.result;

  const tabOnChange = (e) => {
    setTabIndex(e.index);
  };
  return (
    <div className="min-h-0 w-full">
      <StyledTab buttons={["Overview", "Trends", "Utilization"]} onChanged={tabOnChange} />
      <div className="w-full">
        {tabIndex === 0 ? (
          <Overview data={overviewData} />
        ) : tabIndex === 1 ? (
          <Trends />
        ) : (
          <Utilization />
        )}
      </div>
    </div>
  );
}
