import { apiClient } from "./clients";

export async function createVehicle(data) {
  try {
    const response = await apiClient.post(`vehicle/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editVehicle(Id, data) {
  try {
    const response = await apiClient.put(`vehicle/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteVehicle(Id) {
  try {
    const response = await apiClient.delete(`vehicle/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleById(Id) {
  try {
    const response = await apiClient.get(`vehicle/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleList() {
  try {
    const response = await apiClient.get(`vehicle/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleListForDashboard(filter={}) {
  try {
    const response = await apiClient.get(`vehicle/dashboard/list`,{params: filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}


//!Brand
export async function createBrand(data) {
  try {
    const response = await apiClient.post(`brand/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBrand(filter1={}) {
  try {
    let filter = {};
    if(filter1.pageNo1){
      filter.pageNo = filter1.pageNo1;
    }
    if(filter1.searchQuery1){
      filter.searchQuery = filter1.searchQuery1;
    }

    const response = await apiClient.get(`brand/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBrandDropdown() {
  try {
    const response = await apiClient.get(`brand/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editBrand(Id, data) {
  try {
    const response = await apiClient.put(`brand/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBrand(Id) {
  try {
    const response = await apiClient.delete(`brand/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBrandById(Id) {
  try {
    const response = await apiClient.get(`brand/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function vehicleImageUpload(data) {
  try {
    const response = await apiClient.post(`image/upload`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
