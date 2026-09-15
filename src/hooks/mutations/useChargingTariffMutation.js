import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createChargingTariff,
  editChargingTariff,
  deleteChargingTariff,
  defaultChargingTariff,
} from "../../services/chargingTariffAPI";

//* Create charging tariff
export const useCreateChargingTariff = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChargingTariff,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingTariffList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingTariffDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit charging tariff
export const useEditChargingTariff = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editChargingTariff(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingTariffList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingTariffDropdown"] });
      queryClient.invalidateQueries({
        queryKey: ["chargingTariffById", variables.id],
      });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete charging tariff
export const useDeleteChargingTariff = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChargingTariff,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingTariffList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingTariffDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create default charging tariff
export const useDefaultChargingTariff = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: defaultChargingTariff,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingTariffList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingTariffDropdown"] });
      queryClient.invalidateQueries({
        queryKey: ["chargingTariffTotalRate"],
      });
      options.onSuccess?.(data, variables, context);
    },
  });
};
