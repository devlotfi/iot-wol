import { createFileRoute } from "@tanstack/react-router";
import EmptySVG from "../assets/empty.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import AddDeviceModal from "../components/add-device-modal";
import { DeviceStore } from "../device-store";
import DeviceComponent from "../components/device-component";
import { Button, useDisclosure } from "@heroui/react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data } = useQuery({
    queryKey: ["DEVICES"],
    queryFn: () => DeviceStore.getDevices(),
  });

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 flex-col max-w-screen-md w-full">
        <div className="flex justify-between items-center sticky top-0 z-10 bg-content2 py-[1rem] pr-[1rem]">
          <div className="flex px-[1rem] gap-[0.5rem] items-center">
            <FontAwesomeIcon
              icon={faComputer}
              className="text-[18pt]"
            ></FontAwesomeIcon>
            <div className="flex text-[18pt] font-black">
              Devices ({data?.length})
            </div>
          </div>

          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            radius="full"
            className="h-[3.5rem] w-[3.5rem]"
            onPress={onOpen}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-[18pt]"
            ></FontAwesomeIcon>
          </Button>
          <AddDeviceModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            onOpen={onOpen}
          ></AddDeviceModal>
        </div>

        {data?.length ? (
          <div className="flex flex-col flex-1 mt-[0.5rem] gap-[1rem] pl-[1rem] pr-[2.5rem] pb-[5rem]">
            {data.map((device) => (
              <DeviceComponent
                key={device.id}
                device={device}
              ></DeviceComponent>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 text-center justify-center items-center flex-col gap-[1rem] px-[0.5rem]">
            <img
              src={EmptySVG}
              alt="device"
              className="h-[12rem] md:h-[15rem]"
            />
            <div className="flex text-[18pt] font-bold">No devices yet</div>
            <div className="flex text-[13pt] opacity-70">
              Start by adding a device identified by its mac adress
            </div>
            <Button
              color="primary"
              variant="ghost"
              startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              onPress={onOpen}
            >
              Add device
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
