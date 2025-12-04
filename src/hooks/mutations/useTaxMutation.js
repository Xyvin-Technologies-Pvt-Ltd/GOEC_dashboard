import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTax,
  editTax,
  deleteTax,
} from "../../services/taxAPI";

//* Create tax
export const useCreateTax = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTax,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["taxList"] });
      queryClient.invalidateQueries({ queryKey: ["taxDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit tax
export const useEditTax = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editTax(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["taxList"] });
      queryClient.invalidateQueries({ queryKey: ["taxDropdown"] });
      queryClient.invalidateQueries({ queryKey: ["taxById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete tax
export const useDeleteTax = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTax,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["taxList"] });
      queryClient.invalidateQueries({ queryKey: ["taxDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
