import { apiClient } from "./clients";

export async function createWalletTransaction(data) {
  try {
    const response = await apiClient.post(`walletTransaction/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editWalletTransaction(Id, data) {
  try {
    const response = await apiClient.post(`walletTransaction/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteWalletTransaction(Id) {
  try {
    const response = await apiClient.delete(`walletTransaction/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getWalletTransactionById(Id) {
  try {
    const response = await apiClient.get(`walletTransaction/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getWalletTransactionList() {
  try {
    const response = await apiClient.get(`walletTransaction/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getWalletTransactionFilteredList(start, end) {
  try {
    const response = await apiClient.get(
      `walletTransaction/filteredList?fromDate=${start}&toDate=${end}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function getWalletReport(params) {
  try {
    const response = await apiClient.get(
      `walletTransaction/dashboard/report`,{params:params}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAccountTransactionReport(params) {
  try {
    const response = await apiClient.get(
      `walletTransaction/dashboard/account-transaction/report`,{params:params}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}