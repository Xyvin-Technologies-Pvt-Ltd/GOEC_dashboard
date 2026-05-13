import { toast } from "react-toastify";
import { EV_MACHINE_INSTANCE } from "./axiosInstances";

export async function createEvMachine(data) {
  try {
    const response = await EV_MACHINE_INSTANCE.post(`evMachine/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editEvMachine(Id, data) {
  try {
    const response = await EV_MACHINE_INSTANCE.put(`evMachine/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvMachine(Id) {
  try {
    const response = await EV_MACHINE_INSTANCE.delete(`evMachine/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvMachineById(Id) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`evMachine/dashboard/${Id}`);
    const payload = response.data;
    // Dashboard detail responses match list shape: { result: document } (see chargeStationDetail).
    return payload?.result ?? payload;
  } catch (error) {
    throw error;
  }
}

export async function listEvMachine(filter={}) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`/evMachine/dashboard/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateEvMachineStatus(data) {
  try {
    const response = await EV_MACHINE_INSTANCE.post(
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
    const response = await EV_MACHINE_INSTANCE.put(
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
    const response = await EV_MACHINE_INSTANCE.put(
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
    const response = await EV_MACHINE_INSTANCE.post(`oem/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOem(filter={}) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`oem/list`,{params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOemDropdown() {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`oem/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editOem(Id, data) {
  try {
    const response = await EV_MACHINE_INSTANCE.put(`oem/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteOem(Id) {
  try {
    const response = await EV_MACHINE_INSTANCE.delete(`oem/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOemById(Id) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`oem/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


//EVMODEL


//OEM
export async function createEvModel(data) {
  try {
    const response = await EV_MACHINE_INSTANCE.post(`evModel/create`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvModel(filter={}) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`evModel/list`, {params:filter});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvModelDropdown() {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`evModel/list/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editEvModel(Id, data) {
  try {
    const response = await EV_MACHINE_INSTANCE.put(`evModel/${Id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvModel(Id) {
  try {
    const response = await EV_MACHINE_INSTANCE.delete(`evModel/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getEvModelById(Id) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`evModel/${Id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


//tarrif

export async function getChargerTarrifDetail(evMachine) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`evMachine/dashboard/tariffDetails/${evMachine}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function changeEVTarrif(evMachine,data) {
  try {
    const response = await EV_MACHINE_INSTANCE.post(`evMachine/dashboard/changeTariff/${evMachine}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getReportForChargePoint(params) {
  try {
    const response = await EV_MACHINE_INSTANCE.get(`evMachine/dashboard/report/2`,{params:params});
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}