import axios from "axios";

// const baseURL = `https://oxium.goecworld.com`;
// const baseURL = `http://localhost`;
const baseURL = process.env.REACT_APP_API_URL || `http://13.203.2.34:5050`;
const createAxiosInstance = (baseURL, defaultHeaders = {}) => {
  const instance = axios.create({ baseURL, headers: defaultHeaders });
  setupInterceptors(instance);
  return instance;
};

// Function to setup interceptors
const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

///! vehicle
export const VEHICLE_INSTANCES = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! configuration
export const CONFIG_INSTANCES = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

//!charging stations

export const CHARGING_STATION_INSTANCE = createAxiosInstance(
  `${baseURL}/api/v1`,
  { "Content-Type": "application/json" }
);

//!for ev charge  machine, charge points, oem, ev models
export const EV_MACHINE_INSTANCE = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! review

export const REVIEW_INSTANCE = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! user

export const USER_INSTANCE = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! payment

export const PAYMENT_INSTANCE = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! ocpp

export const OCPP_INSTANCE = createAxiosInstance(
  `http://13.203.2.34:6500/api/v1`,
  { "Content-Type": "application/json" }
);

///! transaction url

export const TRANSACTION_URL = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! rfid

export const RFID_URL = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

///! notification

export const NOTIFICATION_URL = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});

//!image upload
export const IMAGE_UPLOAD_URL = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "multipart/form-data",
});

///! rfid

export const LOGS_URL = createAxiosInstance(`${baseURL}/api/v1`, {
  "Content-Type": "application/json",
});
