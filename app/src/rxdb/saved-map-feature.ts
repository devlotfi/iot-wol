import type { RxCollection, RxJsonSchema } from "rxdb";

interface SavedMapFeatureDocType {
  id: string;
}

export type SavedMapFeatureCollection = RxCollection<SavedMapFeatureDocType>;

export const savedMapFeatureSchemaLiteral: RxJsonSchema<SavedMapFeatureDocType> =
  {
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 100,
      },
    },
    required: ["id"],
  };
