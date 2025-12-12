import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { MqttContext, MqttContextInitialValue } from "../context/mqtt-context";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

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
    isOpen: isOpenInvalidPassword,
    onOpen: onOpenInvalidPassword,
    onOpenChange: onOpenChangeInvalidPassword,
  } = useDisclosure();
  const {
    isOpen: isOpenWOLSent,
    onOpen: onOpenWOLSent,
    onOpenChange: onOpenChangeWOLSent,
  } = useDisclosure();
  const {
    isOpen: isOpenTimeout,
    onOpen: onOpenTimeout,
    onOpenChange: onOpenChangeTimeout,
  } = useDisclosure();

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (connectionData && connectionData.requestPending) {
      onOpenLoading();
      timeoutRef.current = setTimeout(() => {
        setConnectionData((connectionData) => ({
          ...connectionData,
          requestPending: false,
        }));
        onCloseLoading();
        onOpenTimeout();
      }, 10000) as unknown as number;
    }
  }, [connectionData, onCloseLoading, onOpenLoading, onOpenTimeout]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("mqtt-context: connected");
      setConnectionData((connectionData) => ({
        ...connectionData,
        isConnected: true,
      }));

      if (connectionData.client && connectionData.responseTopic) {
        connectionData.client.subscribe(connectionData.responseTopic, (err) => {
          if (!err) console.log("Subscribed to ", connectionData.responseTopic);
        });
      }
    };
    const handleReconnect = () => {
      console.log("mqtt-context: reconnect");
      setConnectionData((connectionData) => ({
        ...connectionData,
        isConnected: false,
      }));
    };

    const handleDisconnect = () => {
      console.log("mqtt-context: disconnect");
      setConnectionData((connectionData) => ({
        ...connectionData,
        isConnected: false,
      }));
    };

    const handleMessage = (topic: string, message: Buffer) => {
      const msg = message.toString();
      console.log(`Received: ${msg} ${topic}`);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setConnectionData((connectionData) => ({
        ...connectionData,
        requestPending: false,
      }));
      onCloseLoading();

      switch (msg) {
        case "WOL_SENT":
          onOpenWOLSent();
          break;
        case "INVALID_PASSWORD":
          onOpenInvalidPassword();
          break;
      }
    };

    if (connectionData) {
      connectionData.client.on("connect", handleConnect);
      connectionData.client.on("reconnect", handleReconnect);
      connectionData.client.on("disconnect", handleDisconnect);
      connectionData.client.on("message", handleMessage);
    }

    return () => {
      if (connectionData) {
        connectionData.client.removeListener("connect", handleConnect);
        connectionData.client.removeListener("reconnect", handleReconnect);
        connectionData.client.removeListener("disconnect", handleDisconnect);
        connectionData.client.removeListener("message", handleMessage);
      }
    };
  }, [connectionData, onCloseLoading, onOpenInvalidPassword, onOpenWOLSent]);

  return (
    <>
      <Modal
        isOpen={isOpenLoading}
        onOpenChange={onOpenChangeLoading}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Loading...
              </ModalHeader>
              <ModalBody className="items-center justify-center pb-[3rem]">
                <Spinner size="lg" color="primary"></Spinner>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenTimeout} onOpenChange={onOpenChangeTimeout}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                No response
              </ModalHeader>
              <ModalBody className="items-center justify-center">
                <div className="flex text-center">
                  The request has timed out and no response was recieved
                </div>
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[60pt] text-warning"
                ></FontAwesomeIcon>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenInvalidPassword}
        onOpenChange={onOpenChangeInvalidPassword}
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
              <ModalBody className="items-center justify-center">
                <div className="flex">The given password is invalid</div>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="text-[60pt] text-danger"
                ></FontAwesomeIcon>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenWOLSent} onOpenChange={onOpenChangeWOLSent}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
              <ModalBody className="items-center justify-center">
                <div className="flex">
                  The WOL (Wake-On-Lan) packet has been sent
                </div>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-[60pt] text-success"
                ></FontAwesomeIcon>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <MqttContext.Provider
        value={{
          connectionData,
          setConnectionData,
        }}
      >
        {children}
      </MqttContext.Provider>
    </>
  );
}
