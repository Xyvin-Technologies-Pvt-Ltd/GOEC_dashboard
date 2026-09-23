import { USER_INSTANCE } from "./axiosInstances";

//! Station portal (foco) users — one per charging station

export async function getStationPortalUsers(filter = {}) {
  const response = await USER_INSTANCE.get(`admin/station-users`, { params: filter });
  return response.data;
}

export async function getStationPortalUserByStation(stationId) {
  const response = await USER_INSTANCE.get(`admin/station-users/station/${stationId}`);
  return response.data;
}

export async function createStationPortalUser(data) {
  const response = await USER_INSTANCE.post(`admin/station-users`, data);
  return response.data;
}

export async function updateStationPortalUser(id, data) {
  const response = await USER_INSTANCE.put(`admin/station-users/${id}`, data);
  return response.data;
}

export async function resetStationPortalUserPassword(id) {
  const response = await USER_INSTANCE.post(`admin/station-users/${id}/reset-password`);
  return response.data;
}

export async function deleteStationPortalUser(id) {
  const response = await USER_INSTANCE.delete(`admin/station-users/${id}`);
  return response.data;
}
