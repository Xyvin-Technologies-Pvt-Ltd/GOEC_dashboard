import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  editUser,
  editUserByMob,
  deleteUser,
  addFavSatation,
  removeFavSatation,
  addVehicle,
  removeVehicle,
  addRfidTag,
  removeRfidTag,
  removeRfidTagById,
  fromWallet,
  toWallet,
  userTransaction,
  userAssignAndunAssignTarrif,
  createRole,
  updateRole,
  deleteRole,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../services/userApi";

//* Create user
export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      queryClient.invalidateQueries({ queryKey: ["usersListAdmin"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit user
export const useEditUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }) => editUser(userId, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      queryClient.invalidateQueries({ queryKey: ["usersListAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["userById", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["userByIdAdmin", variables.userId] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit user by mobile
export const useEditUserByMob = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mob, data }) => editUserByMob(mob, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      queryClient.invalidateQueries({ queryKey: ["usersListAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["userByMob", variables.mob] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete user
export const useDeleteUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      queryClient.invalidateQueries({ queryKey: ["usersListAdmin"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Add favorite station
export const useAddFavoriteStation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stationId, data }) => addFavSatation(stationId, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userFavourites"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Remove favorite station
export const useRemoveFavoriteStation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stationId, data }) => removeFavSatation(stationId, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userFavourites"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Add vehicle
export const useAddVehicle = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ vehId, data }) => addVehicle(vehId, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userVehicleDetails"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Remove vehicle
export const useRemoveVehicle = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ vehId, data }) => removeVehicle(vehId, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userVehicleDetails"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Add RFID tag
export const useAddRfidTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => addRfidTag(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userRfidList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Remove RFID tag
export const useRemoveRfidTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => removeRfidTag(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userRfidList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Remove RFID tag by ID
export const useRemoveRfidTagById = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => removeRfidTagById(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userRfidList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Deduct from wallet
export const useDeductFromWallet = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => fromWallet(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userById"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Add to wallet
export const useAddToWallet = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => toWallet(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userById"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* User transaction
export const useUserTransaction = (options = {}) => {
  return useMutation({
    mutationFn: userTransaction,
    ...options,
  });
};

//* Assign/unassign tariff
export const useUserAssignUnassignTariff = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => userAssignAndunAssignTarrif(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["userChargingTariff"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create role
export const useCreateRole = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rolesList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Update role
export const useUpdateRole = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateRole(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rolesList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete role
export const useDeleteRole = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["rolesList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create admin
export const useCreateAdmin = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["adminsList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Update admin
export const useUpdateAdmin = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAdmin(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["adminsList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete admin
export const useDeleteAdmin = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmin,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["adminsList"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
