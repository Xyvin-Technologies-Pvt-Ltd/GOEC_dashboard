import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../services/reviewApi";

//* Delete review
export const useDeleteReview = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["reviewByStation"] });
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      queryClient.invalidateQueries({ queryKey: ["feedbackReport"] });
      options.onSuccess?.(data, variables, context);
    },
  });
};
