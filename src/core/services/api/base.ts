import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.response.use((response: AxiosResponse) => {
  if (response.data) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const newConfig = { ...config };
  if (newConfig.headers["Content-Type"] === "multipart/form-data")
    return newConfig;
  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

  return newConfig;
});

export default api;
