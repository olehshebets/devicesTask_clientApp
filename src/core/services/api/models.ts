export type DeviceType = "WINDOWS" | "MAC" | "LINUX";

export interface Device {
  id: string;
  systemName: string;
  type: DeviceType;
  hddCapacity: string;
}
