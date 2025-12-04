import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllOcppLogs,
  getOcppLogsByCpid,
  getAllOcppTransactionLogs,
  getAlarms,
  getAlarmsById,
  getAlarmSummary,
  getTransactionById,
  getMachineLog,
  getActiveSession,
  getDashboardAnalytics,
  getChargingSummaryReport,
  getDashboardTrends,
  getDashboardUtilization,
  getConfiguration,
  getAlarmReport,
  getInvoice,
} from "../../services/ocppAPI";

//* Get all OCPP logs with filters
export const useOcppLogs = (filters) =>
  useQuery({
    queryKey: ["ocppLogs", filters],
    queryFn: () => getAllOcppLogs(filters),
    placeholderData: keepPreviousData,
  });

//* Get OCPP logs by CPID
export const useOcppLogsByCpid = (cpid, enabled = true) =>
  useQuery({
    queryKey: ["ocppLogsByCpid", cpid],
    queryFn: () => getOcppLogsByCpid(cpid),
    enabled: !!cpid && enabled,
  });

//* Get all OCPP transaction logs with filters
export const useOcppTransactionLogs = (filters = {}) =>
  useQuery({
    queryKey: ["ocppTransactionLogs", filters],
    queryFn: () => getAllOcppTransactionLogs(filters),
    placeholderData: keepPreviousData,
  });

//* Get alarms with filters
export const useAlarms = (filters = {}) =>
  useQuery({
    queryKey: ["alarms", filters],
    queryFn: () => getAlarms(filters),
    placeholderData: keepPreviousData,
  });

//* Get alarms by EV machine ID
export const useAlarmsById = (evMachine, filters = {}, enabled = true) =>
  useQuery({
    queryKey: ["alarmsById", evMachine, filters],
    queryFn: () => getAlarmsById(evMachine, filters),
    enabled: !!evMachine && enabled,
  });

//* Get alarm summary
export const useAlarmSummary = () =>
  useQuery({
    queryKey: ["alarmSummary"],
    queryFn: getAlarmSummary,
  });

//* Get transaction by ID
export const useTransactionById = (evMachine, filters, enabled = true) =>
  useQuery({
    queryKey: ["transactionById", evMachine, filters],
    queryFn: () => getTransactionById(evMachine, filters),
    enabled: !!evMachine && enabled,
  });

//* Get machine log
export const useMachineLog = (evMachine, filters, enabled = true) =>
  useQuery({
    queryKey: ["machineLog", evMachine, filters],
    queryFn: () => getMachineLog(evMachine, filters),
    enabled: !!evMachine && enabled,
  });

//* Get active session
export const useActiveSession = () =>
  useQuery({
    queryKey: ["activeSession"],
    queryFn: getActiveSession,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

//* Get dashboard analytics
export const useDashboardAnalytics = () =>
  useQuery({
    queryKey: ["dashboardAnalytics"],
    queryFn: getDashboardAnalytics,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

//* Get charging summary report
export const useChargingSummaryReport = (params) =>
  useQuery({
    queryKey: ["chargingSummaryReport", params],
    queryFn: () => getChargingSummaryReport(params),
  });

//* Get dashboard trends
export const useDashboardTrends = (filter) =>
  useQuery({
    queryKey: ["dashboardTrends", filter],
    queryFn: () => getDashboardTrends(filter),
  });

//* Get dashboard utilization
export const useDashboardUtilization = (filter) =>
  useQuery({
    queryKey: ["dashboardUtilization", filter],
    queryFn: () => getDashboardUtilization(filter),
  });

//* Get configuration
export const useConfiguration = (cpid, data, enabled = true) =>
  useQuery({
    queryKey: ["configuration", cpid, data],
    queryFn: () => getConfiguration(cpid, data),
    enabled: !!cpid && enabled,
  });

//* Get alarm report
export const useAlarmReport = (params) =>
  useQuery({
    queryKey: ["alarmReport", params],
    queryFn: () => getAlarmReport(params),
  });

//* Get invoice
export const useInvoice = (id, enabled = true) =>
  useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoice(id),
    enabled: !!id && enabled,
  });
