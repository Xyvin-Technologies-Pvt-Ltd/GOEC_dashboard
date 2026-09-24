import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStationPortalUser,
  updateStationPortalUser,
  resetStationPortalUserPassword,
  deleteStationPortalUser,
} from "../../services/stationUserApi";

// Every mutation refreshes both the single-station query and the list
const useStationUserMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["stationPortalUser"] });
      queryClient.invalidateQueries({ queryKey: ["stationPortalUsers"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};

//* Create portal user
export const useCreateStationPortalUser = (options) =>
  useStationUserMutation(createStationPortalUser, options);

//* Update portal user (name, email, mobile, isActive)
export const useUpdateStationPortalUser = (options) =>
  useStationUserMutation(({ id, data }) => updateStationPortalUser(id, data), options);

//* Reset password (emails a new temporary password)
export const useResetStationPortalUserPassword = (options) =>
  useStationUserMutation(resetStationPortalUserPassword, options);

//* Delete portal user
export const useDeleteStationPortalUser = (options) =>
  useStationUserMutation(deleteStationPortalUser, options);
