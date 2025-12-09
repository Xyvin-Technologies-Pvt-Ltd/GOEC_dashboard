import { useQuery } from "@tanstack/react-query";
import {
  getReviewBySation,
  userReviews,
  getFeedbackReport,
} from "../../services/reviewApi";

//* Get review by station
export const useReviewByStation = (id, enabled = true) =>
  useQuery({
    queryKey: ["reviewByStation", id],
    queryFn: () => getReviewBySation(id),
    enabled: !!id && enabled,
  });

//* Get user reviews
export const useUserReviews = (userId, enabled = true) =>
  useQuery({
    queryKey: ["userReviews", userId],
    queryFn: () => userReviews(userId),
    enabled: !!userId && enabled,
  });

//* Get feedback report
export const useFeedbackReport = (params) =>
  useQuery({
    queryKey: ["feedbackReport", params],
    queryFn: () => getFeedbackReport(params),
  });
