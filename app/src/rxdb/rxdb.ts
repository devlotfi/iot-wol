import type { RxDatabase } from "rxdb";
import type { ConnectionCollection } from "./connection";
import type { DeviceCollection } from "./device";

export type DatabaseCollections = {
  connections: ConnectionCollection;
  devices: DeviceCollection;
};

export type AppRxDatabase = RxDatabase<DatabaseCollections>;
