import { apiClient } from "./clients";
export async function getTransactionList(filter={}) {
  try {
    const response = await apiClient.get(`walletTransaction/dashboard/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getWalletTransaction(data,filter={}) {
  try {
    const response = await apiClient.post(`walletTransaction/dashboardUser/List`, data,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}
