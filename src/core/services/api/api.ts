import type { AxiosPromise } from "axios";
import axios from "axios";
import { decamelizeKeys } from "humps";

import { api } from "./base";
import { Device, DeviceType } from "./models";

const BASE_URL = "/devices";

export const getDevices = (): AxiosPromise<Device[]> => {
  return api.get(BASE_URL);
};

export type GetDevicesByIdParams = {
  id: string;
};

export const getDeviceById = ({
  id,
  ...params
}: GetDevicesByIdParams): AxiosPromise<Device> => {
  return api.get(`${BASE_URL}/${id}`, { params });
};

export type DeleteDeviceParams = string;

export const deleteDevice = (id: string): AxiosPromise<void> => {
  return api.delete(`${BASE_URL}/${id}`);
};

export type EditDeviceParams = {
  id: string;
  system_name: string;
  type: string;
  hdd_capacity: string;
};

export const editDevice = ({
  ...params
}: EditDeviceParams): AxiosPromise<void> => {
  return api.put(`${BASE_URL}/${params.id}`, params);
};

export type CreateDeviceParams = {
  system_name: string;
  type: string;
  hdd_capacity: string;
};

export const addDevice = ({
  ...params
}: CreateDeviceParams): AxiosPromise<void> => {
  return api.post(`${BASE_URL}`, params);
};
