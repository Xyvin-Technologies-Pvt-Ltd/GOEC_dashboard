import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVehicle,
  editVehicle,
  deleteVehicle,
  createBrand,
  editBrand,
  deleteBrand,
  vehicleImageUpload,
} from "../../services/vehicleAPI";

//* Create vehicle
export const useCreateVehicle = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleList"] });
      queryClient.invalidateQueries({ queryKey: ["vehicleListDashboard"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit vehicle
export const useEditVehicle = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editVehicle(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleList"] });
      queryClient.invalidateQueries({ queryKey: ["vehicleListDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["vehicleById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete vehicle
export const useDeleteVehicle = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleList"] });
      queryClient.invalidateQueries({ queryKey: ["vehicleListDashboard"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create brand
export const useCreateBrand = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBrand,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["brandList"] });
      queryClient.invalidateQueries({ queryKey: ["brandDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Edit brand
export const useEditBrand = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editBrand(id, data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["brandList"] });
      queryClient.invalidateQueries({ queryKey: ["brandDropdown"] });
      queryClient.invalidateQueries({ queryKey: ["brandById", variables.id] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Delete brand
export const useDeleteBrand = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBrand,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["brandList"] });
      queryClient.invalidateQueries({ queryKey: ["brandDropdown"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Upload vehicle image
export const useVehicleImageUpload = (options = {}) => {
  return useMutation({
    mutationFn: vehicleImageUpload,
    ...options,
  });
};
