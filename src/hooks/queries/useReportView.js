import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getReportView } from "../../services/reportApi";

//* On-screen charging-sessions report (GET /reports/view)
export const useChargingSessionsReportView = (params, enabled) =>
  useQuery({
    queryKey: ["reportView", params],
    queryFn: () => getReportView(params),
    enabled,
    retry: false,
    placeholderData: keepPreviousData,
  });
