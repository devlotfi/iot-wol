import { Button, ButtonGroup, Card, CardBody } from "@heroui/react";
import type { Device } from "../types/device";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faPlay } from "@fortawesome/free-solid-svg-icons";
import DeleteDeviceModal from "./delete-device-modal copy";
import EditDeviceModal from "./edit-device-modal copy 2";

interface DeviceComponentProps {
  device: Device;
}

export default function DeviceComponent({ device }: DeviceComponentProps) {
  return (
    <Card shadow="none" className="relative overflow-visible">
      <CardBody className="flex-row justify-between items-center overflow-visible">
        <div className="flex flex-col gap-[1rem]">
          <div className="flex text-[14pt] font-bold break-all mr-[0.5rem]">
            {device.name}
          </div>
          <div className="flex text-[11pt] opacity-70">{device.mac}</div>
        </div>

        <div className="flex items-center gap-[0.5rem] mr-[2rem]">
          <DeleteDeviceModal device={device}></DeleteDeviceModal>
          <EditDeviceModal device={device}></EditDeviceModal>
        </div>

        <Button
          color="primary"
          radius="full"
          variant="shadow"
          isIconOnly
          size="lg"
          className="absolute right-[-1.5rem]"
        >
          <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
        </Button>
      </CardBody>
    </Card>
  );
}
