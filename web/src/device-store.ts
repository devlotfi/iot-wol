import { Constants } from "./constants";
import type { Device } from "./types/device";
import { v4 as uuid } from "uuid";

export abstract class DeviceStore {
  public static getDevices(): Device[] {
    const devicesRaw = localStorage.getItem(Constants.DEVICES_STORAGE_KEY);

    if (devicesRaw) {
      try {
        const devices = JSON.parse(devicesRaw);
        return devices;
      } catch {
        localStorage.setItem(Constants.DEVICES_STORAGE_KEY, JSON.stringify([]));
        return [];
      }
    } else {
      localStorage.setItem(Constants.DEVICES_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
  }

  public static addDevice(device: Omit<Device, "id">): void {
    const devices = this.getDevices();
    localStorage.setItem(
      Constants.DEVICES_STORAGE_KEY,
      JSON.stringify([
        ...devices,
        {
          id: uuid(),
          ...device,
        } as Device,
      ])
    );
  }

  public static editDevice(device: Device): void {
    const devices = this.getDevices();
    localStorage.setItem(
      Constants.DEVICES_STORAGE_KEY,
      JSON.stringify(
        devices.map((item) => {
          if (item.id === device.id) {
            return {
              id: item.id,
              name: device.name,
              mac: device.mac,
            };
          } else {
            return item;
          }
        })
      )
    );
  }

  public static deleteDevice(id: string): void {
    const devices = this.getDevices();
    localStorage.setItem(
      Constants.DEVICES_STORAGE_KEY,
      JSON.stringify(devices.filter((device) => device.id !== id))
    );
  }
}
