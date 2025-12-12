import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenAlt,
  faPlug,
  faRightLeft,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { MqttContext } from "../../context/mqtt-context";
import type { ConnectionDocType } from "../../rxdb/connection";
import DeleteConnectionModal from "./delete-connection-modal";
import EditConnectionModal from "./edit-connection-modal";
import DataRow from "../data-row";
import { useMutation } from "@tanstack/react-query";

interface ConnectionProps {
  connection: ConnectionDocType;
}

export default function Connection({ connection }: ConnectionProps) {
  const { connectionData } = useContext(MqttContext);

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

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {},
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

        <div className="flex flex-col md:flex-row pr-[1.5rem] gap-[1rem]">
          <div className="flex flex-col flex-1">
            <div className="flex font-bold text-[15pt]">{connection.name}</div>
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
              endContent={<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>}
              onPress={() => onOpenDelete()}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardBody>

      <div className="flex items-center">
        <Button
          isIconOnly
          color="primary"
          variant="shadow"
          radius="full"
          size="lg"
          isDisabled={(connectionData && connectionData.isConnected) || false}
          isLoading={isPending}
          className="absolute right-0 translate-x-[50%] z-10"
        >
          <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
        </Button>
      </div>
    </Card>
  );
}
