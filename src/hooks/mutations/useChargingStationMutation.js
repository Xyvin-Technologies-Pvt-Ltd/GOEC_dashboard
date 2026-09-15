import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createChargingStation,
  editChargingStation,
  deleteChargingStation,
  updateChargingStationByList,
} from "../../services/stationAPI";

//* Create charging station
export const useCreateChargingStation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChargingStation,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingStationList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingStationDropdown"] });
      queryClient.invalidateQueries({ queryKey: ["listOfChargingStation"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit charging station
export const useEditChargingStation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editChargingStation(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingStationList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingStationDropdown"] });
      queryClient.invalidateQueries({
        queryKey: ["chargingStationById", variables.id],
      });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete charging station
export const useDeleteChargingStation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChargingStation,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingStationList"] });
      queryClient.invalidateQueries({ queryKey: ["chargingStationDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Update charging station by list
export const useUpdateChargingStationByList = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateChargingStationByList,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["chargingStationList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
