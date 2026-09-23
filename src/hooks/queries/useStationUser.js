import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getStationPortalUsers,
  getStationPortalUserByStation,
} from "../../services/stationUserApi";

//* Station portal users list
export const useStationPortalUsers = (filters) =>
  useQuery({
    queryKey: ["stationPortalUsers", filters],
    queryFn: () => getStationPortalUsers(filters),
    placeholderData: keepPreviousData,
  });

//* Portal user of one station (result is null when none exists)
export const useStationPortalUser = (stationId, enabled = true) =>
  useQuery({
    queryKey: ["stationPortalUser", stationId],
    queryFn: () => getStationPortalUserByStation(stationId),
    enabled: !!stationId && enabled,
    select: (res) => res?.result ?? null,
    retry: false,
  });
