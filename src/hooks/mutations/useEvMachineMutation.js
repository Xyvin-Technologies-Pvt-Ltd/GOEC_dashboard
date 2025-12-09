import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvMachine,
  editEvMachine,
  deleteEvMachine,
  updateEvMachineStatus,
  addConnector,
  removeConnector,
  createOem,
  editOem,
  deleteOem,
  createEvModel,
  editEvModel,
  deleteEvModel,
  changeEVTarrif,
} from "../../services/evMachineAPI";

//* Create EV machine
export const useCreateEvMachine = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvMachine,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evMachineList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit EV machine
export const useEditEvMachine = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editEvMachine(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evMachineList"] });
      queryClient.invalidateQueries({ queryKey: ["evMachineById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete EV machine
export const useDeleteEvMachine = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvMachine,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evMachineList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Update EV machine status
export const useUpdateEvMachineStatus = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvMachineStatus,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evMachineList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Add connector
export const useAddConnector = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => addConnector(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evMachineById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Remove connector
export const useRemoveConnector = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => removeConnector(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evMachineById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create OEM
export const useCreateOem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOem,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["oemList"] });
      queryClient.invalidateQueries({ queryKey: ["oemDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit OEM
export const useEditOem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editOem(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["oemList"] });
      queryClient.invalidateQueries({ queryKey: ["oemDropdown"] });
      queryClient.invalidateQueries({ queryKey: ["oemById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete OEM
export const useDeleteOem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOem,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["oemList"] });
      queryClient.invalidateQueries({ queryKey: ["oemDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create EV model
export const useCreateEvModel = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvModel,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evModelList"] });
      queryClient.invalidateQueries({ queryKey: ["evModelDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit EV model
export const useEditEvModel = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editEvModel(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evModelList"] });
      queryClient.invalidateQueries({ queryKey: ["evModelDropdown"] });
      queryClient.invalidateQueries({ queryKey: ["evModelById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete EV model
export const useDeleteEvModel = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvModel,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["evModelList"] });
      queryClient.invalidateQueries({ queryKey: ["evModelDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Change EV tariff
export const useChangeEvTariff = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ evMachine, data }) => changeEVTarrif(evMachine, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargerTariffDetail"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
