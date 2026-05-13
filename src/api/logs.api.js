import { apiClient } from "./clients";

export async function getServerLogs(filter) {
  try {
    const response = await apiClient.get(`logs`, { params: filter });
    return response.data;
  } catch (error) {
    throw error;
  }
}
