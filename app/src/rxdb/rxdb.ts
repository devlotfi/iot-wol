import type { RxDatabase } from "rxdb";
import type { SavedMapFeatureCollection } from "./saved-map-feature";

export type DatabaseCollections = {
  savedMapFeatures: SavedMapFeatureCollection;
};

export type AppRxDatabase = RxDatabase<DatabaseCollections>;
