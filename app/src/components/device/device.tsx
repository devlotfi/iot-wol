import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import type { DeviceDocType } from "../../rxdb/device";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenAlt,
  faPlay,
  faRightLeft,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { MqttContext } from "../../context/mqtt-context";
import DeleteDeviceModal from "./delete-device-modal";
import EditDeviceModal from "./edit-device-modal";
import DataRow from "../data-row";
import { useTranslation } from "react-i18next";

interface DeviceProps {
  device: DeviceDocType;
}

export default function Device({ device }: DeviceProps) {
  const { t } = useTranslation();
  const { connectionData, wakeDevice, pingDevice } = useContext(MqttContext);

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

  return (
    <Card className="flex-row relative overflow-visible">
      <CardBody>
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

        <div className="flex flex-col md:flex-row pr-[1.5rem] gap-[1rem]">
          <div className="flex flex-col flex-1">
            <div className="flex font-bold text-[15pt] break-all">
              {device.name}
            </div>
            <DataRow name="MAC" value={device.mac}></DataRow>
            <DataRow name="IP" value={device.ip || "Not set"}></DataRow>
          </div>

          <div className="flex md:flex-col gap-[0.3rem]">
            <Button
              size="sm"
              radius="full"
              variant="bordered"
              className="w-full md:w-auto border border-divider"
              isDisabled={
                !(connectionData && connectionData.isConnected) || !device.ip
              }
              endContent={
                <FontAwesomeIcon icon={faRightLeft}></FontAwesomeIcon>
              }
              onPress={() => pingDevice(device)}
            >
              Ping
            </Button>
            <Button
              size="sm"
              radius="full"
              variant="bordered"
              className="w-full md:w-auto border border-divider"
              endContent={<FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>}
              onPress={() => onOpenEdit()}
            >
              {t("edit")}
            </Button>
            <Button
              size="sm"
              radius="full"
              variant="bordered"
              className="w-full md:w-auto border border-divider"
              endContent={<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>}
              onPress={() => onOpenDelete()}
            >
              {t("delete")}
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
          isDisabled={!(connectionData && connectionData.isConnected)}
          className="absolute right-0 translate-x-[50%] z-10"
          onPress={() => wakeDevice(device)}
        >
          <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
        </Button>
      </div>
    </Card>
  );
}
