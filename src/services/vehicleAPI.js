import { IMAGE_UPLOAD_URL, VEHICLE_INSTANCES } from "./axiosInstances";

export async function createVehicle(data) {
  try {
    const response = await VEHICLE_INSTANCES.post(`vehicle/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editVehicle(Id, data) {
  try {
    const response = await VEHICLE_INSTANCES.put(`vehicle/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteVehicle(Id) {
  try {
    const response = await VEHICLE_INSTANCES.delete(`vehicle/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleById(Id) {
  try {
    const response = await VEHICLE_INSTANCES.get(`vehicle/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleList() {
  try {
    const response = await VEHICLE_INSTANCES.get(`vehicle/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleListForDashboard(filter={}) {
  try {
    const response = await VEHICLE_INSTANCES.get(`vehicle/dashboard/list`,{params: filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}


//!Brand
export async function createBrand(data) {
  try {
    const response = await VEHICLE_INSTANCES.post(`brand/create`, data);
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

    const response = await VEHICLE_INSTANCES.get(`brand/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBrandDropdown() {
  try {
    const response = await VEHICLE_INSTANCES.get(`brand/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editBrand(Id, data) {
  try {
    const response = await VEHICLE_INSTANCES.put(`brand/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBrand(Id) {
  try {
    const response = await VEHICLE_INSTANCES.delete(`brand/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBrandById(Id) {
  try {
    const response = await VEHICLE_INSTANCES.get(`brand/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function vehicleImageUpload(file) {
  try {
    const form = new FormData();
    form.append("image", file);
    const response = await IMAGE_UPLOAD_URL.post(`image/upload`, form);
    return response.data;
  } catch (error) {
    throw error;
  }
}
