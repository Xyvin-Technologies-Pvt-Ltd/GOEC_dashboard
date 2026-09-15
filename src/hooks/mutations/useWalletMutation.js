import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWalletTransaction,
  editWalletTransaction,
  deleteWalletTransaction,
} from "../../services/walletAPI";

//* Create wallet transaction
export const useCreateWalletTransaction = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWalletTransaction,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["walletTransactionList"] });
      queryClient.invalidateQueries({ queryKey: ["walletReport"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit wallet transaction
export const useEditWalletTransaction = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editWalletTransaction(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["walletTransactionList"] });
      queryClient.invalidateQueries({ queryKey: ["walletTransactionById", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["walletReport"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete wallet transaction
export const useDeleteWalletTransaction = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWalletTransaction,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["walletTransactionList"] });
      queryClient.invalidateQueries({ queryKey: ["walletReport"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
