import axios from "axios";

const apiBase =
  import.meta.env.VITE_API_BASE_URL ??
  "http://13.203.2.34:5050/api/v1";
const ocppBase =
  import.meta.env.VITE_OCPP_BASE_URL ??
  "http://13.203.2.34:6500/api/v1";

const attachInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  return instance;
};

export const apiClient = attachInterceptors(
  axios.create({
    baseURL: apiBase,
    headers: { "Content-Type": "application/json" },
  }),
);

export const ocppClient = attachInterceptors(
  axios.create({
    baseURL: ocppBase,
    headers: { "Content-Type": "application/json" },
  }),
);

export const uploadClient = attachInterceptors(
  axios.create({
    baseURL: apiBase,
    headers: { "Content-Type": "multipart/form-data" },
  }),
);
