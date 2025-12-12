import type { RxCollection, RxJsonSchema } from "rxdb";

export interface DeviceDocType {
  id: string;
  name: string;
  mac: string;
  ip: string | null;
}

export type DeviceCollection = RxCollection<DeviceDocType>;

export const deviceSchemaLiteral: RxJsonSchema<DeviceDocType> = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 255,
    },
    name: {
      type: "string",
      maxLength: 255,
    },
    mac: {
      type: "string",
      maxLength: 255,
    },
    ip: {
      type: ["string", "null"],
      maxLength: 255,
    },
  },
  required: ["id", "name", "mac", "ip"],
};
