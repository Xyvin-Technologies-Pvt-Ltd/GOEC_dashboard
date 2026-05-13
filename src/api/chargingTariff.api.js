import { apiClient } from "./clients";

export async function createChargingTariff(data) {
  try {
    const response = await apiClient.post(`chargingTariff/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function defaultChargingTariff(data) {
  try {
    const response = await apiClient.post(
      `chargingTariff/createUpdate/default`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editChargingTariff(Id, data) {
  try {
    const response = await apiClient.put(`chargingTariff/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteChargingTariff(Id) {
  try {
    const response = await apiClient.delete(`chargingTariff/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingTariffById(Id) {
  try {
    const response = await apiClient.get(`chargingTariff/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingTariffTotalRate() {
  try {
    const response = await apiClient.get(
      `chargingTariff/getTotalRate/default`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingTariffList(filter={}) {
  try {
    const response = await apiClient.get(`chargingTariff/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingTariffListDropdown() {
  try {
    const response = await apiClient.get(`chargingTariff/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}