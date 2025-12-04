import { useQuery } from "@tanstack/react-query";
import {
  getWalletTransactionList,
  getWalletTransactionById,
  getWalletTransactionFilteredList,
  getWalletReport,
  getAccountTransactionReport,
} from "../../services/walletAPI";

//* Get wallet transaction list
export const useWalletTransactionList = () =>
  useQuery({
    queryKey: ["walletTransactionList"],
    queryFn: getWalletTransactionList,
  });

//* Get wallet transaction by ID
export const useWalletTransactionById = (id, enabled = true) =>
  useQuery({
    queryKey: ["walletTransactionById", id],
    queryFn: () => getWalletTransactionById(id),
    enabled: !!id && enabled,
  });

//* Get wallet transaction filtered list by date range
export const useWalletTransactionFilteredList = (start, end, enabled = true) =>
  useQuery({
    queryKey: ["walletTransactionFiltered", start, end],
    queryFn: () => getWalletTransactionFilteredList(start, end),
    enabled: !!start && !!end && enabled,
  });

//* Get wallet report
export const useWalletReport = (params) =>
  useQuery({
    queryKey: ["walletReport", params],
    queryFn: () => getWalletReport(params),
  });

//* Get account transaction report
export const useAccountTransactionReport = (params) =>
  useQuery({
    queryKey: ["accountTransactionReport", params],
    queryFn: () => getAccountTransactionReport(params),
  });
