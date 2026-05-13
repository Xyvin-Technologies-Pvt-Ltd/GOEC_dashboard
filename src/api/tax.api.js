import { apiClient } from "./clients";

export async function createTax(data) {
  try {
    const response = await apiClient.post(`tax/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editTax(Id, data) {
  try {
    const response = await apiClient.put(`tax/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTax(Id) {
  try {
    const response = await apiClient.delete(`tax/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTaxById(Id) {
  try {
    const response = await apiClient.get(`tax/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTaxList(filter={}) {
  try {
    const response = await apiClient.get(`tax/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTaxListDropdown() {
  try {
    const response = await apiClient.get(`tax/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}