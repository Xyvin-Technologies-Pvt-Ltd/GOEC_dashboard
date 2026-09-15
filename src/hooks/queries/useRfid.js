import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getRfidList,
  getRfidById,
  getRfidBySNo,
  getRfidUnassignedList,
} from "../../services/rfidAPI";

//* Get RFID list with filters
export const useRfidList = (filters) =>
  useQuery({
    queryKey: ["rfidList", filters],
    queryFn: () => getRfidList(filters),
    placeholderData: keepPreviousData,
  });

//* Get RFID by ID
export const useRfidById = (id, enabled = true) =>
  useQuery({
    queryKey: ["rfidById", id],
    queryFn: () => getRfidById(id),
    enabled: !!id && enabled,
  });

//* Get RFID by Serial Number
export const useRfidBySNo = () =>
  useQuery({
    queryKey: ["rfidBySNo"],
    queryFn: getRfidBySNo,
  });

//* Get unassigned RFID list
export const useRfidUnassignedList = () =>
  useQuery({
    queryKey: ["rfidUnassignedList"],
    queryFn: getRfidUnassignedList,
  });
