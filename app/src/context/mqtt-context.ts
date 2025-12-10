import mqtt from "mqtt";
import { createContext } from "react";

export interface ConnectionData {
  client: mqtt.MqttClient | null;
  isConnected: boolean;
  requestPending: boolean;
  topic: string | null;
  acknowledgementTopic: string | null;
  WOLPassword: string | null;
}

interface MqttContext {
  connectionData: ConnectionData;
  setConnectionData: (value: (value: ConnectionData) => ConnectionData) => void;
}

export const MqttContextInitialValue: MqttContext = {
  connectionData: {
    client: null,
    isConnected: false,
    requestPending: false,
    topic: null,
    acknowledgementTopic: null,
    WOLPassword: null,
  },
  setConnectionData() {},
};

export const MqttContext = createContext(MqttContextInitialValue);
