import React from "react";
import ActiveSession from "../components/cpoSupport/activeSession/AllActiveSession";
import NoActiveSession from "../components/cpoSupport/activeSession/NoActiveSession";
import { useActiveSession } from "../hooks/queries/useOcpp";
import { tableHeaderReplace } from "../components/common/tableHeaderReplace";

export default function ActiveSessionPage() {
  const { data: activeSessionData, refetch, isLoading } = useActiveSession();

  const activeSession = activeSessionData?.result || [];

  const tableHeader = [
    "OCPP Txn ID",
    "User Name",
    "Charge Station Name",
    "Date",
    "CPID",
    "Connector ID",
    "Start Soc",
    "Current Soc",
    "Units Consumed(kWh)",
    "Duration",
    "Charging Speed",
    "Last Meter Value Received",
    "Transaction Mode",
    "Terminate Session",
  ];

  const activeSessionTableData = tableHeaderReplace(
    activeSession,
    [
      "transactionId",
      "username",
      "chargingStationName",
      "startTime",
      "cpid",
      "connectorId",
      "startSoc",
      "currentSoc",
      "unitConsumed",
      "duration",
      "chargeSpeed",
      "lastMeterValue",
      "transactionMode",
      "terminateSession",
    ],
    tableHeader,
  );

  if (isLoading) {
    return (
      <ActiveSession
        data={[]}
        dataReload={refetch}
        tableHeader={tableHeader}
        isLoading
      />
    );
  }

  if (activeSession.length === 0) {
    return <NoActiveSession />;
  }

  return (
    <ActiveSession
      data={activeSessionTableData}
      dataReload={refetch}
      tableHeader={tableHeader}
      isLoading={false}
    />
  );
}
