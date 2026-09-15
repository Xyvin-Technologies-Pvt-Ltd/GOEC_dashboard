import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getServerLogs } from "../../services/logsApi";

//* Get server logs with filters
export const useServerLogs = (filters) =>
  useQuery({
    queryKey: ["serverLogs", filters],
    queryFn: () => getServerLogs(filters),
    placeholderData: keepPreviousData,
  });
