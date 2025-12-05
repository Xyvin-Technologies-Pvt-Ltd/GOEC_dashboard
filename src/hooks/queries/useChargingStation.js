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

//* Get charging points for multiple stations (wrapper for compatibility)
export const useChargingPointsForStations = (stationIds, enabled = true) =>
  useQuery({
    queryKey: ["chargingPointsForStations", stationIds],
    queryFn: async () => {
      if (!stationIds || stationIds.length === 0) {
        return [];
      }
      
      // If 'all' is passed, fetch all charging points
      if (stationIds.includes("all")) {
        const allStations = await getListOfChargingStation();
        if (!allStations?.result) return [];
        
        const allPoints = [];
        for (const station of allStations.result) {
          try {
            const points = await getChargingPointsListOfStation(station._id);
            if (points?.result) {
              allPoints.push(...points.result);
            }
          } catch (error) {
            console.error(`Error fetching points for station ${station._id}:`, error);
          }
        }
        return allPoints;
      }
      
      // For specific station IDs, fetch points for the first one or combine
      if (stationIds.length === 1) {
        const result = await getChargingPointsListOfStation(stationIds[0]);
        return result?.result || [];
      }
      
      // If multiple stations, fetch all and combine
      const allPoints = [];
      for (const stationId of stationIds) {
        try {
          const result = await getChargingPointsListOfStation(stationId);
          if (result?.result) {
            allPoints.push(...result.result);
          }
        } catch (error) {
          console.error(`Error fetching points for station ${stationId}:`, error);
        }
      }
      return allPoints;
    },
    enabled: !!stationIds && stationIds.length > 0 && enabled,
  });
