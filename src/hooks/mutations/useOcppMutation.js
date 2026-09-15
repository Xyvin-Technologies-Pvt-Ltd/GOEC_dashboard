import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  remoteStart,
  remoteStopTransaction,
  clearCache,
  unlock,
  reset,
  ChangeAvailability,
  Trigger,
  LocalList,
  getDiagonostics,
  changeConfiguration,
  sendMail,
} from "../../services/ocppAPI";

//* Remote start transaction
export const useRemoteStart = (options = {}) => {
  return useMutation({
    mutationFn: ({ data, cpid }) => remoteStart(data, cpid),
    ...options,
  });
};

//* Remote stop transaction
export const useRemoteStopTransaction = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => remoteStopTransaction(cpid, data),
    ...options,
  });
};

//* Clear cache
export const useClearCache = (options = {}) => {
  return useMutation({
    mutationFn: clearCache,
    ...options,
  });
};

//* Unlock connector
export const useUnlock = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => unlock(cpid, data),
    ...options,
  });
};

//* Reset
export const useReset = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, formData }) => reset(cpid, formData),
    ...options,
  });
};

//* Change availability
export const useChangeAvailability = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => ChangeAvailability(cpid, data),
    ...options,
  });
};

//* Trigger message
export const useTriggerMessage = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => Trigger(cpid, data),
    ...options,
  });
};

//* Send local list
export const useSendLocalList = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => LocalList(cpid, data),
    ...options,
  });
};

//* Get diagnostics
export const useGetDiagnostics = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => getDiagonostics(cpid, data),
    ...options,
  });
};

//* Change configuration
export const useChangeConfiguration = (options = {}) => {
  return useMutation({
    mutationFn: ({ cpid, data }) => changeConfiguration(cpid, data),
    ...options,
  });
};

//* Send invoice mail
export const useSendInvoiceMail = (options = {}) => {
  return useMutation({
    mutationFn: sendMail,
    ...options,
  });
};
