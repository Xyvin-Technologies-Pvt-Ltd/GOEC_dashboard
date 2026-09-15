import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getChargingTariffList,
  getChargingTariffListDropdown,
  getChargingTariffById,
  getChargingTariffTotalRate,
} from "../../services/chargingTariffAPI";

//* Get paginated charging tariff list
export const useChargingTariffList = (pageNo, searchQuery) =>
  useQuery({
    queryKey: ["chargingTariffList", pageNo, searchQuery],
    queryFn: () => getChargingTariffList({ pageNo, searchQuery }),
    placeholderData: keepPreviousData,
  });

//* Get tariff dropdown list
export const useChargingTariffDropdown = () =>
  useQuery({
    queryKey: ["chargingTariffDropdown"],
    queryFn: getChargingTariffListDropdown,
    select: (res) =>
      res?.result?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
  });

//* Get tariff by ID
export const useChargingTariffById = (id, enabled = true) =>
  useQuery({
    queryKey: ["chargingTariffById", id],
    queryFn: () => getChargingTariffById(id),
    enabled: !!id && enabled,
  });

//* Get total rate
export const useChargingTariffTotalRate = () =>
  useQuery({
    queryKey: ["chargingTariffTotalRate"],
    queryFn: getChargingTariffTotalRate,
  });
