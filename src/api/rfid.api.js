import { apiClient } from "./clients";

export async function createRfid(data) {
  try {
    const response = await apiClient.post(`rfid/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function createManyRfid(data) {
  try {
    const response = await apiClient.post(`rfid/createMany`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function editRfid(Id, data) {
  try {
    const response = await apiClient.put(`rfid/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRfid(Id) {
  try {
    const response = await apiClient.delete(`rfid/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidById(Id) {
  try {
    const response = await apiClient.get(`rfid/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidBySNo() {
  try {
    // ? 111222333444 is id or  not?
    const response = await apiClient.get(
      `rfid/rfidbySerialNumber/111222333444`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidList(filter={}) {
  try {
    const response = await apiClient.get(`rfid/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRfidUnassignedList() {
  try {
    const response = await apiClient.get(`rfid/unassignedList`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
