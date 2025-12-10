import { RxDBContext } from "../context/rxdb-context";
import { useQuery } from "@tanstack/react-query";
import { createRxDatabase } from "rxdb/plugins/core";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { Spinner } from "@heroui/react";
import type { PropsWithChildren } from "react";
import ErrorScreen from "../components/error-screen";
import type { AppRxDatabase } from "../rxdb/rxdb";
import { savedMapFeatureSchemaLiteral } from "../rxdb/saved-map-feature";

export default function RxDBProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["RXDB"],
    queryFn: async () => {
      const rxDb = await createRxDatabase<AppRxDatabase>({
        name: "usthb-atlas",
        storage: wrappedValidateAjvStorage({
          storage: getRxStorageDexie(),
        }),
        closeDuplicates: true,
      });

      await rxDb.addCollections({
        savedMapFeatures: {
          schema: savedMapFeatureSchemaLiteral,
        },
      });

      return rxDb;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <Spinner size="lg" color="primary"></Spinner>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return <ErrorScreen></ErrorScreen>;
  }

  return (
    <RxDBContext.Provider
      value={{
        rxdb: data!,
      }}
    >
      {children}
    </RxDBContext.Provider>
  );
}
