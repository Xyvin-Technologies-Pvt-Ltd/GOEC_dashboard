import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getTransactionList,
  getWalletTransaction,
} from "../../services/transactionApi";

//* Get transaction list with filters
export const useTransactionList = (filters) =>
  useQuery({
    queryKey: ["transactionList", filters],
    queryFn: () => getTransactionList(filters),
    placeholderData: keepPreviousData,
  });

//* Get wallet transaction with filters
export const useWalletTransaction = (data, filters = {}) =>
  useQuery({
    queryKey: ["walletTransaction", data, filters],
    queryFn: () => getWalletTransaction(data, filters),
    enabled: !!data,
  });
