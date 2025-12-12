import mqtt from "mqtt";
import { createContext, type SetStateAction } from "react";

export interface ConnectionData {
  client: mqtt.MqttClient;
  isConnected: boolean;
  requestPending: boolean;
  id: string;
  topic: string;
  responseTopic: string;
}

interface MqttContext {
  connectionData: ConnectionData | null;
  setConnectionData: (value: SetStateAction<ConnectionData | null>) => void;
}

export const MqttContextInitialValue: MqttContext = {
  connectionData: null,
  setConnectionData() {},
};

export const MqttContext = createContext(MqttContextInitialValue);
