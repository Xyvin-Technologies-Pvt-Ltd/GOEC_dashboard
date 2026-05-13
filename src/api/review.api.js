import { apiClient } from "./clients";

export async function getReviewBySation(id) {
  try {
    const response = await apiClient.get(`/review/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteReview(id) {
  try {
    const response = await apiClient.delete(`/review/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userReviews(Id) {
  try {
    const response = await apiClient.get(`review/filteredList?user=${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFeedbackReport(params) {
  try {
    const response = await apiClient.get(`reviews/feedbackReport`, {params:params});
    return response.data;
  } catch (error) {
    throw error;
  }
}