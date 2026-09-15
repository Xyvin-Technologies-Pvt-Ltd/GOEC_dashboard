import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRfid,
  createManyRfid,
  editRfid,
  deleteRfid,
} from "../../services/rfidAPI";

//* Create RFID
export const useCreateRfid = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRfid,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rfidList"] });
      queryClient.invalidateQueries({ queryKey: ["rfidUnassignedList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create many RFIDs
export const useCreateManyRfid = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createManyRfid,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rfidList"] });
      queryClient.invalidateQueries({ queryKey: ["rfidUnassignedList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit RFID
export const useEditRfid = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editRfid(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rfidList"] });
      queryClient.invalidateQueries({ queryKey: ["rfidUnassignedList"] });
      queryClient.invalidateQueries({ queryKey: ["rfidById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete RFID
export const useDeleteRfid = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRfid,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rfidList"] });
      queryClient.invalidateQueries({ queryKey: ["rfidUnassignedList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
