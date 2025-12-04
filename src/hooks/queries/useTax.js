import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getTaxList,
  getTaxListDropdown,
  getTaxById,
} from "../../services/taxAPI";

//* Get tax list with filters
export const useTaxList = (filters) =>
  useQuery({
    queryKey: ["taxList", filters],
    queryFn: () => getTaxList(filters),
    placeholderData: keepPreviousData,
  });

//* Get tax dropdown list
export const useTaxDropdown = () =>
  useQuery({
    queryKey: ["taxDropdown"],
    queryFn: getTaxListDropdown,
    select: (res) =>
      res?.result?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
  });

//* Get tax by ID
export const useTaxById = (id, enabled = true) =>
  useQuery({
    queryKey: ["taxById", id],
    queryFn: () => getTaxById(id),
    enabled: !!id && enabled,
  });
