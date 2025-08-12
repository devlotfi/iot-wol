import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import type { Device } from "../types/device";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faPlay } from "@fortawesome/free-solid-svg-icons";
import DeleteDeviceModal from "./delete-device-moda";
import EditDeviceModal from "./edit-device-modal";
import { useContext } from "react";
import { MqttContext } from "../context/mqtt-context";
import { useMutation } from "@tanstack/react-query";

interface DeviceComponentProps {
  device: Device;
}

export default function DeviceComponent({ device }: DeviceComponentProps) {
  const { connectionData, setConnectionData } = useContext(MqttContext);

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
    mutationFn: async () => {
      if (connectionData.client && connectionData.topic) {
        console.log("send wol");
        setConnectionData((connectionData) => ({
          ...connectionData,
          requestPending: true,
        }));
        await connectionData.client.publishAsync(
          connectionData.topic,
          `${connectionData.WOLPassword} ${device.mac}`
        );
      }
    },
  });

  return (
    <Card shadow="sm" className="relative overflow-visible">
      <CardBody className="flex-row justify-between items-center overflow-visible">
        <DeleteDeviceModal
          device={device}
          isOpen={isOpenDelete}
          onOpen={onOpenDelete}
          onOpenChange={onOpenChangeDelete}
          onClose={onCloseDelete}
        ></DeleteDeviceModal>
        <EditDeviceModal
          device={device}
          isOpen={isOpenEdit}
          onOpen={onOpenEdit}
          onOpenChange={onOpenChangeEdit}
          onClose={onCloseEdit}
        ></EditDeviceModal>

        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex text-[14pt] font-bold break-all mr-[0.5rem]">
            {device.name}
          </div>
          <div className="flex text-[11pt] opacity-70">{device.mac}</div>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              variant="bordered"
              size="sm"
              isIconOnly
              className="mr-[2rem]"
            >
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={(key) => {
              switch (key) {
                case "EDIT":
                  onOpenEdit();
                  break;
                case "DELETE":
                  onOpenDelete();
                  break;
              }
            }}
          >
            <DropdownItem key="EDIT">Edit</DropdownItem>
            <DropdownItem key="DELETE" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button
          color="primary"
          radius="full"
          variant="shadow"
          isIconOnly
          size="lg"
          className="absolute right-[-1.5rem]"
          isDisabled={!connectionData.isConnected}
          onPress={() => mutate()}
          isLoading={isPending}
        >
          <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
        </Button>
      </CardBody>
    </Card>
  );
}
