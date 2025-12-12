import mqtt from "mqtt";
import { createContext, type SetStateAction } from "react";
import type { ConnectionDocType } from "../rxdb/connection";
import type { DeviceDocType } from "../rxdb/device";

export interface ConnectionData {
  client: mqtt.MqttClient;
  isConnected: boolean;
  id: string;
  name: string;
  topic: string;
  responseTopic: string;
}

interface MqttContext {
  connectionData: ConnectionData | null;
  setConnectionData: (value: SetStateAction<ConnectionData | null>) => void;
  mqttConnect: (connection: ConnectionDocType, password?: string) => void;
  mqttDisconnect: () => void;
  wakeDevice: (device: DeviceDocType) => void;
  pingDevice: (device: DeviceDocType) => void;
}

export const MqttContextInitialValue: MqttContext = {
  connectionData: null,
  setConnectionData() {},
  mqttConnect() {},
  mqttDisconnect() {},
  wakeDevice() {},
  pingDevice() {},
};

export const MqttContext = createContext(MqttContextInitialValue);
