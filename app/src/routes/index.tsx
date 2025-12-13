import { Button, useDisclosure } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { RxDBContext } from "../context/rxdb-context";
import { faComputer, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddDeviceModal from "../components/device/add-device-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmptySVG from "../assets/empty.svg";
import Device from "../components/device/device";
import Heading from "../components/heading";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const { rxdb } = useContext(RxDBContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["DEVICES"],
    queryFn: async () => {
      const data = await rxdb.devices.find().exec();
      return data;
    },
  });

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 flex-col max-w-screen-md w-full">
        <div className="flex justify-between items-center z-10 py-[1rem] px-[1rem]">
          <Heading
            icon={faComputer}
            title={`${t("devices")} (${data?.length || 0})`}
          ></Heading>

          <Button
            isIconOnly
            color="primary"
            variant="bordered"
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

        {isLoading ? (
          <LoadingScreen></LoadingScreen>
        ) : isError ? (
          <ErrorScreen></ErrorScreen>
        ) : data && data.length ? (
          <div className="flex flex-col flex-1 mt-[0.5rem] gap-[1rem] pl-[1rem] pr-[2.5rem] pb-[5rem]">
            {data.map((device) => (
              <Device key={device.id} device={device}></Device>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 text-center justify-center items-center flex-col gap-[1rem] px-[0.5rem]">
            <img
              src={EmptySVG}
              alt="device"
              className="h-[12rem] md:h-[15rem]"
            />
            <div className="flex text-[18pt] font-bold">
              {t("noDevices.title")}
            </div>
            <div className="flex text-[13pt] opacity-70">
              {t("noDevices.subTitle")}
            </div>
            <Button
              radius="full"
              color="primary"
              variant="ghost"
              startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              onPress={onOpen}
            >
              {t("addDevice")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
