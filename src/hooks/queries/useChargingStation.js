import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getChargingStationList,
  getChargingStationListDropdown,
  getChargingStationById,
  getChargingPointsListOfStation,
  getListOfChargingStation,
} from "../../services/stationAPI";

//* Get charging station list with filters
export const useChargingStationList = (filters) =>
  useQuery({
    queryKey: ["chargingStationList", filters],
    queryFn: () => getChargingStationList(filters),
    placeholderData: keepPreviousData,
  });

//* Get charging station dropdown list
export const useChargingStationDropdown = () =>
  useQuery({
    queryKey: ["chargingStationDropdown"],
    queryFn: getChargingStationListDropdown,
    select: (res) =>
      res?.result?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
  });

//* Get charging station by ID
export const useChargingStationById = (id, enabled = true) =>
  useQuery({
    queryKey: ["chargingStationById", id],
    queryFn: () => getChargingStationById(id),
    enabled: !!id && enabled,
  });

//* Get charging points of a station
export const useChargingPointsOfStation = (stationId, enabled = true) =>
  useQuery({
    queryKey: ["chargingPointsOfStation", stationId],
    queryFn: () => getChargingPointsListOfStation(stationId),
    enabled: !!stationId && enabled,
  });

//* Get all charging stations list
export const useListOfChargingStation = () =>
  useQuery({
    queryKey: ["listOfChargingStation"],
    queryFn: getListOfChargingStation,
  });
