import type { RxCollection, RxJsonSchema } from "rxdb";

export interface ConnectionDocType {
  id: string;
  name: string;
  url: string;
  username: string | null;
  topic: string;
  responseTopic: string;
}

export type ConnectionCollection = RxCollection<ConnectionDocType>;

export const connectionSchemaLiteral: RxJsonSchema<ConnectionDocType> = {
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
    url: {
      type: "string",
      maxLength: 255,
    },
    username: {
      type: ["string", "null"],
      maxLength: 255,
    },
    topic: {
      type: "string",
      maxLength: 255,
    },
    responseTopic: {
      type: "string",
      maxLength: 255,
    },
  },
  required: ["id", "url", "topic", "responseTopic"],
};
