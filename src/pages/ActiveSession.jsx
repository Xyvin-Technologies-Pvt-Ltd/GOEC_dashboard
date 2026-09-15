import React from "react";
import ActiveSession from "../components/cpoSupport/activeSession/AllActiveSession";
import NoActiveSession from "../components/cpoSupport/activeSession/NoActiveSession";
import { DummyData } from "../assets/json/ActiveSessionsData";
import { useActiveSession } from "../hooks/queries/useOcpp";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";

function restructureData(dataArray) {

  return dataArray.map((item) => ({
    _id: item._id,
    transactionId: item.transactionId,
    username: item.username,
    chargingStationName: item.chargingStationName,
    startTime: item.startTime,
    cpid: item.cpid,
    connectorId: item.connectorId,
    startSoc: item.startSoc,
    currentSoc: item.currentSoc,
    unitConsumed: item.unitConsumed,
    duration: item.duration,
    chargeSpeed: item.chargeSpeed,
    lastMeterReceived: item.updatedAt,
    transactionMode: item.transactionMode,
    terminateSession: "Stop",
  }));
}

export default function ActiveSessionPage() {
  // TanStack Query hook - automatically refetches every 5 seconds
  const { data: activeSessionData, refetch } = useActiveSession();

  // Extract data with safe defaults
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

  // const restructuredData = restructureData(activeSession);

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
    tableHeader
  );


  return (
    <>{activeSession.length > 0 ? <ActiveSession data={activeSessionTableData} dataReload={refetch} tableHeader={tableHeader} /> : <NoActiveSession />}</>
  );
}
