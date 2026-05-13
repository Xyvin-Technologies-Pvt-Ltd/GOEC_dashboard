import { apiClient } from "./clients";

export async function createChargingStation(data) {
  try {
    const response = await apiClient.post(`chargingStations/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editChargingStation(Id, data) {
  try {
    const response = await apiClient.put(`chargingStations/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteChargingStation(Id) {
  try {
    const response = await apiClient.delete(`chargingStations/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingStationById(Id) {
  try {
    const response = await apiClient.get(`chargingStations/dashboard/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingStationList(filter={}) {
  try {
    const response = await apiClient.get(`chargingStations/dashboard/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingStationListDropdown() {
  try {
    const response = await apiClient.get(`chargingStations/dashboard/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getChargingPointsListOfStation(id) {
  try {
    const response = await apiClient.get(`/chargingStations/dashboard/evMachineList/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateChargingStationByList(data) {
  try {
    const response = await apiClient.post(
      `chargingStations/nearBy/list`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getListOfChargingStation() {
  try {
    const response = await apiClient.get(`chargingStations/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}