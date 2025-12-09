import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getUsersList,
  getUserById,
  getUserByMob,
  getUsersListforAdmin,
  getUserByIdforAdmin,
  getUserByEmailMobile,
  userFavourites,
  userchargingTariff,
  uservehicleDetails,
  userRfidList,
  userSuggestionList,
  getRoles,
  getAdmins,
  getUserRegistationReport,
} from "../../services/userApi";

//* Get users list
export const useUsersList = () =>
  useQuery({
    queryKey: ["usersList"],
    queryFn: getUsersList,
  });

//* Get user by ID
export const useUserById = (id, enabled = true) =>
  useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserById(id),
    enabled: !!id && enabled,
  });

//* Get user by mobile number
export const useUserByMob = (mob, enabled = true) =>
  useQuery({
    queryKey: ["userByMob", mob],
    queryFn: () => getUserByMob(mob),
    enabled: !!mob && enabled,
  });

//* Get users list for admin with filters
export const useUsersListForAdmin = (filters) =>
  useQuery({
    queryKey: ["usersListAdmin", filters],
    queryFn: () => getUsersListforAdmin(filters),
    placeholderData: keepPreviousData,
  });

//* Get user by ID for admin
export const useUserByIdForAdmin = (id, enabled = true) =>
  useQuery({
    queryKey: ["userByIdAdmin", id],
    queryFn: () => getUserByIdforAdmin(id),
    enabled: !!id && enabled,
  });

//* Get user by email or mobile
export const useUserByEmailMobile = (data, enabled = true) =>
  useQuery({
    queryKey: ["userByEmailMobile", data],
    queryFn: () => getUserByEmailMobile(data),
    enabled: !!data && enabled,
  });

//* Get user favorites
export const useUserFavourites = (userId, filters = {}) =>
  useQuery({
    queryKey: ["userFavourites", userId, filters],
    queryFn: () => userFavourites(userId, filters),
    enabled: !!userId,
  });

//* Get user charging tariff
export const useUserChargingTariff = (userId, enabled = true) =>
  useQuery({
    queryKey: ["userChargingTariff", userId],
    queryFn: () => userchargingTariff(userId),
    enabled: !!userId && enabled,
  });

//* Get user vehicle details
export const useUserVehicleDetails = (userId, enabled = true) =>
  useQuery({
    queryKey: ["userVehicleDetails", userId],
    queryFn: () => uservehicleDetails(userId),
    enabled: !!userId && enabled,
  });

//* Get user RFID list
export const useUserRfidList = (userId, filters = {}) =>
  useQuery({
    queryKey: ["userRfidList", userId, filters],
    queryFn: () => userRfidList(userId, filters),
    enabled: !!userId,
  });

//* Get user suggestions
export const useUserSuggestionList = (query, enabled = true) =>
  useQuery({
    queryKey: ["userSuggestions", query],
    queryFn: () => userSuggestionList(query),
    enabled: !!query && enabled,
  });

//* Get roles list with filters
export const useRolesList = (filters = {}) =>
  useQuery({
    queryKey: ["rolesList", filters],
    queryFn: () => getRoles(filters),
    placeholderData: keepPreviousData,
  });

//* Get admins list with filters
export const useAdminsList = (filters = {}) =>
  useQuery({
    queryKey: ["adminsList", filters],
    queryFn: () => getAdmins(filters),
    placeholderData: keepPreviousData,
  });

//* Get user registration report
export const useUserRegistrationReport = (params) =>
  useQuery({
    queryKey: ["userRegistrationReport", params],
    queryFn: () => getUserRegistationReport(params),
  });
