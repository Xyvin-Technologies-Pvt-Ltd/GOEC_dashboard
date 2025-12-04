import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getVehicleList,
  getVehicleById,
  getVehicleListForDashboard,
  getBrand,
  getBrandDropdown,
  getBrandById,
} from "../../services/vehicleAPI";

//* Get vehicle list
export const useVehicleList = () =>
  useQuery({
    queryKey: ["vehicleList"],
    queryFn: getVehicleList,
  });

//* Get vehicle list for dashboard with filters
export const useVehicleListForDashboard = (filters) =>
  useQuery({
    queryKey: ["vehicleListDashboard", filters],
    queryFn: () => getVehicleListForDashboard(filters),
    placeholderData: keepPreviousData,
  });

//* Get vehicle by ID
export const useVehicleById = (id, enabled = true) =>
  useQuery({
    queryKey: ["vehicleById", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id && enabled,
  });

//* Get brand list
export const useBrandList = (filters) =>
  useQuery({
    queryKey: ["brandList", filters],
    queryFn: () => getBrand(filters),
    placeholderData: keepPreviousData,
  });

//* Get brand dropdown
export const useBrandDropdown = () =>
  useQuery({
    queryKey: ["brandDropdown"],
    queryFn: getBrandDropdown,
    select: (res) =>
      res?.result?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
  });

//* Get brand by ID
export const useBrandById = (id, enabled = true) =>
  useQuery({
    queryKey: ["brandById", id],
    queryFn: () => getBrandById(id),
    enabled: !!id && enabled,
  });
