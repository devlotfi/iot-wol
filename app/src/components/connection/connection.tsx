import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenAlt,
  faPlug,
  faPlugCircleXmark,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { MqttContext } from "../../context/mqtt-context";
import type { ConnectionDocType } from "../../rxdb/connection";
import DeleteConnectionModal from "./delete-connection-modal";
import EditConnectionModal from "./edit-connection-modal";
import DataRow from "../data-row";
import { useMutation } from "@tanstack/react-query";
import PasswordModal from "./password-modal";

interface ConnectionProps {
  connection: ConnectionDocType;
}

export default function Connection({ connection }: ConnectionProps) {
  const { connectionData, mqttConnect, mqttDisconnect } =
    useContext(MqttContext);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onClose: onClosePassword,
    onOpenChange: onOpenChangePassword,
  } = useDisclosure();

  const { mutate: mutateConnect, isPending: isPendingConnect } = useMutation({
    mutationFn: async (password?: string) => {
      await mqttConnect(connection, password);
    },
  });
  const { mutate: mutateDisconnect, isPending: isPendingDisconnect } =
    useMutation({
      mutationFn: async () => {
        await mqttDisconnect();
      },
    });

  return (
    <Card className="flex-row relative overflow-visible">
      <CardBody>
        <DeleteConnectionModal
          connection={connection}
          isOpen={isOpenDelete}
          onOpen={onOpenDelete}
          onOpenChange={onOpenChangeDelete}
          onClose={onCloseDelete}
        ></DeleteConnectionModal>
        <EditConnectionModal
          connection={connection}
          isOpen={isOpenEdit}
          onOpen={onOpenEdit}
          onOpenChange={onOpenChangeEdit}
          onClose={onCloseEdit}
        ></EditConnectionModal>
        {connection.username ? (
          <PasswordModal
            isOpen={isOpenPassword}
            onOpen={onOpenPassword}
            onOpenChange={onOpenChangePassword}
            onClose={onClosePassword}
            onSubmit={(password) => mutateConnect(password)}
          ></PasswordModal>
        ) : null}

        <div className="flex flex-col md:flex-row pr-[1.5rem] gap-[1rem]">
          <div className="flex flex-col flex-1">
            <div className="flex font-bold text-[15pt] break-all">
              {connection.name}
            </div>
            <DataRow name="URL" value={connection.url}></DataRow>
            <DataRow name="Topic" value={connection.topic}></DataRow>
            <DataRow
              name="Response topic"
              value={connection.responseTopic}
            ></DataRow>

            {connection.username ? (
              <>
                <div className="flex font-bold text-[12pt]">
                  Authenthication
                </div>
                <DataRow name="Username" value={connection.username}></DataRow>
              </>
            ) : null}
          </div>

          <div className="flex md:flex-col gap-[0.3rem]">
            <Button
              size="sm"
              radius="full"
              variant="bordered"
              className="w-full md:w-auto border border-divider"
              isDisabled={connectionData !== null}
              endContent={<FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>}
              onPress={() => onOpenEdit()}
            >
              Edit
            </Button>
            <Button
              size="sm"
              radius="full"
              variant="bordered"
              className="w-full md:w-auto border border-divider"
              isDisabled={connectionData !== null}
              endContent={<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>}
              onPress={() => onOpenDelete()}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardBody>

      <div className="flex items-center">
        {connectionData && connectionData.id === connection.id ? (
          <Button
            isIconOnly
            color="danger"
            variant="shadow"
            radius="full"
            size="lg"
            isLoading={isPendingDisconnect}
            className="absolute right-0 translate-x-[50%] z-10"
            onPress={() => mutateDisconnect()}
          >
            <FontAwesomeIcon icon={faPlugCircleXmark}></FontAwesomeIcon>
          </Button>
        ) : (
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            radius="full"
            size="lg"
            isDisabled={connectionData !== null}
            isLoading={isPendingConnect}
            className="absolute right-0 translate-x-[50%] z-10"
            onPress={() => {
              console.log("lol", connection.username);
              if (connection.username) {
                console.log("lol");

                onOpenPassword();
              } else {
                mutateConnect(undefined);
              }
            }}
          >
            <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
          </Button>
        )}
      </div>
    </Card>
  );
}
