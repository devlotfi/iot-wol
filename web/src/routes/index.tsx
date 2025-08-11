import { createFileRoute } from "@tanstack/react-router";
import DeviceSVG from "../assets/device.svg";
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import type { Device } from "../types/device";
import { Constants } from "../constants";
import AddDeviceModal from "../components/add-device-modal";
import { DeviceStore } from "../device-store";
import DeviceComponent from "../components/device-component";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["DEVICES"],
    queryFn: () => DeviceStore.getDevices(),
  });

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 flex-col max-w-screen-md w-full">
        <div className="flex justify-between items-center sticky top-0 z-10 bg-content2 py-[1.5rem]">
          <div className="flex px-[1rem] gap-[0.5rem] justify-center items-center">
            <FontAwesomeIcon
              icon={faComputer}
              className="text-[23pt]"
            ></FontAwesomeIcon>
            <div className="flex text-[23pt] font-black">Devices</div>
          </div>

          <AddDeviceModal></AddDeviceModal>
        </div>

        {data?.length ? (
          <div className="flex flex-col flex-1 mt-[1.5rem] gap-[1rem] pl-[1rem] pr-[2.5rem] pb-[5rem]">
            {data.map((device) => (
              <DeviceComponent
                key={device.id}
                device={device}
              ></DeviceComponent>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 justify-center items-center flex-col gap-[1rem]">
            <img
              src={DeviceSVG}
              alt="device"
              className="h-[12rem] md:h-[15rem]"
            />
            <div className="flex text-[18pt] font-bold">Empty list</div>
          </div>
        )}
      </div>
    </div>
  );
}
