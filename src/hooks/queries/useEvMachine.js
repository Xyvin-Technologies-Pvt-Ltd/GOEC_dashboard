import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getEvMachineById,
  listEvMachine,
  getOem,
  getOemDropdown,
  getOemById,
  getEvModel,
  getEvModelDropdown,
  getEvModelById,
  getChargerTarrifDetail,
  getReportForChargePoint,
} from "../../services/evMachineAPI";

//* Get EV machine list with filters
export const useEvMachineList = (filters) =>
  useQuery({
    queryKey: ["evMachineList", filters],
    queryFn: () => listEvMachine(filters),
    placeholderData: keepPreviousData,
  });

//* Get EV machine by ID
export const useEvMachineById = (id, enabled = true) =>
  useQuery({
    queryKey: ["evMachineById", id],
    queryFn: () => getEvMachineById(id),
    enabled: !!id && enabled,
  });

//* Get OEM list with filters
export const useOemList = (filters) =>
  useQuery({
    queryKey: ["oemList", filters],
    queryFn: () => getOem(filters),
    placeholderData: keepPreviousData,
  });

//* Get OEM dropdown
export const useOemDropdown = () =>
  useQuery({
    queryKey: ["oemDropdown"],
    queryFn: getOemDropdown,
    select: (res) =>
      res?.result?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
  });

//* Get OEM by ID
export const useOemById = (id, enabled = true) =>
  useQuery({
    queryKey: ["oemById", id],
    queryFn: () => getOemById(id),
    enabled: !!id && enabled,
  });

//* Get EV model list with filters
export const useEvModelList = (filters) =>
  useQuery({
    queryKey: ["evModelList", filters],
    queryFn: () => getEvModel(filters),
    placeholderData: keepPreviousData,
  });

//* Get EV model dropdown
export const useEvModelDropdown = () =>
  useQuery({
    queryKey: ["evModelDropdown"],
    queryFn: getEvModelDropdown,
    select: (res) =>
      res?.result?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
  });

//* Get EV model by ID
export const useEvModelById = (id, enabled = true) =>
  useQuery({
    queryKey: ["evModelById", id],
    queryFn: () => getEvModelById(id),
    enabled: !!id && enabled,
  });

//* Get charger tariff details
export const useChargerTariffDetail = (evMachine, enabled = true) =>
  useQuery({
    queryKey: ["chargerTariffDetail", evMachine],
    queryFn: () => getChargerTarrifDetail(evMachine),
    enabled: !!evMachine && enabled,
  });

//* Get charge point report
export const useChargePointReport = (params, enabled = true) =>
  useQuery({
    queryKey: ["chargePointReport", params],
    queryFn: () => getReportForChargePoint(params),
    enabled: enabled,
  });
