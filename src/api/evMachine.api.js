import { toast } from "react-toastify";
import { apiClient } from "./clients";

export async function createEvMachine(data) {
  try {
    const response = await apiClient.post(`evMachine/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editEvMachine(Id, data) {
  try {
    const response = await apiClient.put(`evMachine/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvMachine(Id) {
  try {
    const response = await apiClient.delete(`evMachine/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvMachineById(Id) {
  try {
    const response = await apiClient.get(`evMachine/dashboard/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listEvMachine(filter={}) {
  try {
    const response = await apiClient.get(`/evMachine/dashboard/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEvMachineStatus(data) {
  try {
    const response = await apiClient.post(
      `evMachine/updateStatusConnector/CP 1`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addConnector(Id, data) {
  try {
    const response = await apiClient.put(
      `evMachine/addConnector/${Id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function removeConnector(Id, data) {
  try {
    const response = await apiClient.put(
      `evMachine/removeConnector/${Id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


//OEM
export async function createOem(data) {
  try {
    const response = await apiClient.post(`oem/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOem(filter={}) {
  try {
    const response = await apiClient.get(`oem/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOemDropdown() {
  try {
    const response = await apiClient.get(`oem/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editOem(Id, data) {
  try {
    const response = await apiClient.put(`oem/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteOem(Id) {
  try {
    const response = await apiClient.delete(`oem/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOemById(Id) {
  try {
    const response = await apiClient.get(`oem/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


//EVMODEL


//OEM
export async function createEvModel(data) {
  try {
    const response = await apiClient.post(`evModel/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvModel(filter={}) {
  try {
    const response = await apiClient.get(`evModel/list`, {params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvModelDropdown() {
  try {
    const response = await apiClient.get(`evModel/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editEvModel(Id, data) {
  try {
    const response = await apiClient.put(`evModel/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvModel(Id) {
  try {
    const response = await apiClient.delete(`evModel/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvModelById(Id) {
  try {
    const response = await apiClient.get(`evModel/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


//tarrif

export async function getChargerTarrifDetail(evMachine) {
  try {
    const response = await apiClient.get(`evMachine/dashboard/tariffDetails/${evMachine}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function changeEVTarrif(evMachine,data) {
  try {
    const response = await apiClient.post(`evMachine/dashboard/changeTariff/${evMachine}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getReportForChargePoint(params) {
  try {
    const response = await apiClient.get(`evMachine/dashboard/report/2`,{params:params});
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}