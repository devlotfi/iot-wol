interface WakePayload {
  command: "WAKE";
  params: {
    mac: string;
  };
}

interface PingPayload {
  command: "PING";
  params: {
    ip: string;
  };
}

export type MqttCommand = WakePayload | PingPayload;
