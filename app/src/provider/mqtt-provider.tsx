import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { MqttContext, MqttContextInitialValue } from "../context/mqtt-context";
import { useDisclosure } from "@heroui/react";
import type { ConnectionDocType } from "../rxdb/connection";
import mqtt from "mqtt";
import type { DeviceDocType } from "../rxdb/device";
import WOLSentModal from "../components/mqtt-modals/wol-sent-modal";
import ErrorModal from "../components/mqtt-modals/error-modal";
import TimeoutModal from "../components/mqtt-modals/timeout-modal";
import LoadingModal from "../components/mqtt-modals/loading-modal";
import DeviceOnModal from "../components/mqtt-modals/device-on-modal";
import DeviceOffModal from "../components/mqtt-modals/device-off-modal";
import type { MqttCommand } from "../types/mqtt-command";
import type { MqttEvent } from "../types/mqtt-event";

export default function MqttProvider({ children }: PropsWithChildren) {
  const [connectionData, setConnectionData] = useState(
    MqttContextInitialValue.connectionData
  );

  const {
    isOpen: isOpenLoading,
    onOpen: onOpenLoading,
    onClose: onCloseLoading,
    onOpenChange: onOpenChangeLoading,
  } = useDisclosure();
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onOpenChange: onOpenChangeError,
    onClose: onCloseError,
  } = useDisclosure();
  const {
    isOpen: isOpenWOLSent,
    onOpen: onOpenWOLSent,
    onOpenChange: onOpenChangeWOLSent,
    onClose: onCloseWOLSent,
  } = useDisclosure();
  const {
    isOpen: isOpenTimeout,
    onOpen: onOpenTimeout,
    onOpenChange: onOpenChangeTimeout,
    onClose: onCloseTimeout,
  } = useDisclosure();
  const {
    isOpen: isOpenDeviceOn,
    onOpen: onOpenDeviceOn,
    onOpenChange: onOpenChangeDeviceOn,
    onClose: onCloseDeviceOn,
  } = useDisclosure();
  const {
    isOpen: isOpenDeviceOff,
    onOpen: onOpenDeviceOff,
    onOpenChange: onOpenChangeDeviceOff,
    onClose: onCloseDeviceOff,
  } = useDisclosure();

  const timeoutRef = useRef<number | null>(null);

  const openLoading = useCallback(() => {
    onOpenLoading();
    timeoutRef.current = setTimeout(() => {
      onCloseLoading();
      onOpenTimeout();
    }, 10000) as unknown as number;
  }, [onCloseLoading, onOpenLoading, onOpenTimeout]);

  const closeLoading = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onCloseLoading();
  }, [onCloseLoading]);

  const mqttConnect = useCallback(
    async (connection: ConnectionDocType, password?: string) => {
      if (connectionData) {
        await connectionData.client.endAsync();
      }

      const client = await mqtt.connect(connection.url, {
        username: connection.username || undefined,
        password: password || undefined,
        reconnectPeriod: 1000,
      });

      setConnectionData(() => ({
        client,
        id: connection.id,
        name: connection.name,
        isConnected: false,
        topic: connection.topic,
        responseTopic: connection.responseTopic,
      }));
      openLoading();
    },
    [connectionData, openLoading]
  );

  const mqttDisconnect = useCallback(async () => {
    if (connectionData) {
      await connectionData.client.endAsync();
    }
    setConnectionData(() => null);
  }, [connectionData]);

  const wakeDevice = useCallback(
    async (device: DeviceDocType) => {
      if (!connectionData) return;
      openLoading();
      const data: MqttCommand = {
        command: "WAKE",
        params: {
          mac: device.mac,
        },
      };
      await connectionData.client.publishAsync(
        connectionData.topic,
        JSON.stringify(data)
      );
    },
    [connectionData, openLoading]
  );

  const pingDevice = useCallback(
    async (device: DeviceDocType) => {
      if (!connectionData || !device.ip) return;
      openLoading();
      const data: MqttCommand = {
        command: "PING",
        params: {
          ip: device.ip,
        },
      };
      await connectionData.client.publishAsync(
        connectionData.topic,
        JSON.stringify(data)
      );
    },
    [connectionData, openLoading]
  );

  useEffect(() => {
    const handleConnect = () => {
      console.log("mqtt-context: connected");
      closeLoading();
      setConnectionData((connectionData) => {
        if (!connectionData) return null;
        return { ...connectionData, isConnected: true };
      });

      if (connectionData) {
        connectionData.client.subscribe(connectionData.responseTopic, (err) => {
          if (!err) console.log("Subscribed to ", connectionData.responseTopic);
        });
      }
    };
    const handleReconnect = () => {
      console.log("mqtt-context: reconnect");
      setConnectionData((connectionData) => {
        if (!connectionData) return null;
        return { ...connectionData, isConnected: false };
      });
    };

    const handleDisconnect = () => {
      console.log("mqtt-context: disconnect");
      setConnectionData((connectionData) => {
        if (!connectionData) return null;
        return { ...connectionData, isConnected: false };
      });
    };

    const handleError = () => {
      console.log("mqtt-context: error");
      closeLoading();
      setConnectionData((connectionData) => {
        if (!connectionData) return null;
        connectionData.client.end(true);
        return null;
      });
      onOpenError();
    };

    const handleMessage = (_: string, message: Buffer) => {
      const msg = message.toString();
      const payload: MqttEvent = JSON.parse(msg);

      closeLoading();

      if (payload.event === "WOL_SENT") {
        onOpenWOLSent();
      } else if (payload.event === "PING_RESULT") {
        if (payload.alive) {
          onOpenDeviceOn();
        } else {
          onOpenDeviceOff();
        }
      }
    };

    if (connectionData) {
      connectionData.client.on("connect", handleConnect);
      connectionData.client.on("reconnect", handleReconnect);
      connectionData.client.on("disconnect", handleDisconnect);
      connectionData.client.on("message", handleMessage);
      connectionData.client.on("error", handleError);
    }

    return () => {
      if (connectionData) {
        connectionData.client.removeListener("connect", handleConnect);
        connectionData.client.removeListener("reconnect", handleReconnect);
        connectionData.client.removeListener("disconnect", handleDisconnect);
        connectionData.client.removeListener("message", handleMessage);
        connectionData.client.removeListener("error", handleError);
      }
    };
  }, [
    closeLoading,
    connectionData,
    onCloseLoading,
    onOpenDeviceOff,
    onOpenDeviceOn,
    onOpenError,
    onOpenWOLSent,
  ]);

  return (
    <>
      <LoadingModal
        isOpen={isOpenLoading}
        onOpen={onOpenLoading}
        onOpenChange={onOpenChangeLoading}
        onClose={onCloseLoading}
      ></LoadingModal>
      <TimeoutModal
        isOpen={isOpenTimeout}
        onOpen={onOpenTimeout}
        onOpenChange={onOpenChangeTimeout}
        onClose={onCloseTimeout}
      ></TimeoutModal>
      <ErrorModal
        isOpen={isOpenError}
        onOpen={onOpenError}
        onOpenChange={onOpenChangeError}
        onClose={onCloseError}
      ></ErrorModal>
      <WOLSentModal
        isOpen={isOpenWOLSent}
        onOpen={onOpenWOLSent}
        onOpenChange={onOpenChangeWOLSent}
        onClose={onCloseWOLSent}
      ></WOLSentModal>
      <DeviceOnModal
        isOpen={isOpenDeviceOn}
        onOpen={onOpenDeviceOn}
        onOpenChange={onOpenChangeDeviceOn}
        onClose={onCloseDeviceOn}
      ></DeviceOnModal>
      <DeviceOffModal
        isOpen={isOpenDeviceOff}
        onOpen={onOpenDeviceOff}
        onOpenChange={onOpenChangeDeviceOff}
        onClose={onCloseDeviceOff}
      ></DeviceOffModal>

      <MqttContext.Provider
        value={{
          connectionData,
          setConnectionData,
          mqttConnect,
          mqttDisconnect,
          wakeDevice,
          pingDevice,
        }}
      >
        {children}
      </MqttContext.Provider>
    </>
  );
}
