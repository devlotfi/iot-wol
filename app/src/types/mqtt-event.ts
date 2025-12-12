interface WOLSentPayload {
  event: "WOL_SENT";
  mac: string;
}

interface PingResultPayload {
  event: "PING_RESULT";
  ip: string;
  alive: boolean;
}

export type MqttEvent = WOLSentPayload | PingResultPayload;
