import { USER_INSTANCE } from "./axiosInstances";

export async function createUser(data) {
  try {
    const response = await USER_INSTANCE.post(`users/user`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editUser(userId, data) {
  try {
    const response = await USER_INSTANCE.put(`users/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editUserByMob(mob, data) {
  try {
    const response = await USER_INSTANCE.put(`users/update/byMobileNo/${mob}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await USER_INSTANCE.delete(`users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId) {
  try {
    const response = await USER_INSTANCE.get(`users/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserByMob(mob) {
  try {
    const response = await USER_INSTANCE.get(`users/user/byMobileNo/${mob}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsersList() {
  try {
    const response = await USER_INSTANCE.get(`users/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsersListforAdmin(filter={}) {
  try {
    const response = await USER_INSTANCE.get(`admin/userList`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserByIdforAdmin(id) {
  try {
    const response = await USER_INSTANCE.get(`admin/userDatabyId/${id}`);
    return response.data;

  } catch (error) {
    throw error;
  }
}

export async function getUserByEmailMobile(data) {
  try {
    const response = await USER_INSTANCE.get(`admin/userDatabyPhoneOrEmail?${data}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addFavSatation(stationId, data) {
  try {
    const response = await USER_INSTANCE.put(`users/addFavoriteStation/${stationId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeFavSatation(stationId, data) {
  try {
    const response = await USER_INSTANCE.put(`users/removeFavoriteStation/${stationId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addVehicle(vehId, data) {
  try {
    const response = await USER_INSTANCE.put(`users/addVehicle/${vehId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeVehicle(vehId, data) {
  try {
    const response = await USER_INSTANCE.put(`users/removeVehicle${vehId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addRfidTag(id, data) {
  try {
    const response = await USER_INSTANCE.put(`users/addRfidTag/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeRfidTag(id, data) {
  try {
    const response = await USER_INSTANCE.put(`users/removeRfidTag/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeRfidTagById(id, data) {
  try {
    const response = await USER_INSTANCE.put(`users/removeRfiTagById/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fromWallet(Id, data) {
  try {
    const response = await USER_INSTANCE.put(`users/deductFromWallet/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function toWallet(Id, data) {
  try {
    const response = await USER_INSTANCE.put(`users/addToWallet/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userRfidAuth() {
  // ? Confusion to 111222333444 is id or  not?
  try {
    const response = await USER_INSTANCE.get(`users/transaction/rfid-authenticate/111222333444`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userTransaction(Id) {
  try {
    const response = await USER_INSTANCE.put(`users/transaction/authenticate/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userFavourites(Id,filter={}) {
  try {
    const response = await USER_INSTANCE.get(`admin/favoriteStations/${Id}`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userchargingTariff(Id) {
  try {
    const response = await USER_INSTANCE.get(`admin/chargingTariff/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uservehicleDetails(Id) {
  try {
    const response = await USER_INSTANCE.get(`admin/vehicleDetails/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userAssignAndunAssignTarrif(Id, data) {
  try {
    const response = await USER_INSTANCE.put(`admin/assignUnassignChargingTariff/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userRfidList(Id, filter={}) {
  try {
    const response = await USER_INSTANCE.get(`admin/rfidDetails/${Id}`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function userSuggestionList(data) {
  try {
    const response = await USER_INSTANCE.get(`admin/suggestions?query=${data}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//create role

export async function createRole(data) {
  try {
    const response = await USER_INSTANCE.post(`admin/role/create`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function getRoles(filter={}) {
  try {
    const response = await USER_INSTANCE.get(`admin/role/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteRole(id) {
  try {
    const response = await USER_INSTANCE.delete(`admin/role/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateRole(id,data) {
  try {
    const response = await USER_INSTANCE.put(`admin/role/${id}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


//create admin

export async function createAdmin(data) {
  try {
    const response = await USER_INSTANCE.post(`admin/admin/create`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function getAdmins(filter={}) {
  try {
    const response = await USER_INSTANCE.get(`admin/admin/list`, {params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function deleteAdmin(id) {
  try {
    const response = await USER_INSTANCE.delete(`admin/admin/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAdmin(id,data) {
  try {
    const response = await USER_INSTANCE.put(`admin/admin/${id}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function adminLogin(data) {
  try {
    const response = await USER_INSTANCE.post(`admin/admin-signin`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserRegistationReport(params) {
  try {
    const response = await USER_INSTANCE.get(`users/getUserRegistationReport`, {params:params});
    return response.data;
  } catch (error) {
    throw error;
  }
}