import { Button, useDisclosure } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { RxDBContext } from "../context/rxdb-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWifi } from "@fortawesome/free-solid-svg-icons";
import EmptySVG from "../assets/empty.svg";
import AddConnectionModal from "../components/connection/add-connection-modal";
import Connection from "../components/connection/connection";

export const Route = createFileRoute("/connections")({
  component: RouteComponent,
});

function RouteComponent() {
  const { rxdb } = useContext(RxDBContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data } = useQuery({
    queryKey: ["CONNECTIONS"],
    queryFn: async () => {
      const data = await rxdb.connections.find().exec();
      return data;
    },
  });

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 flex-col max-w-screen-md w-full">
        <div className="flex justify-between items-center sticky top-0 z-10 py-[1rem] px-[1rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="flex justify-center items-center rounded-full h-[3rem] w-[3rem] bg-primary">
              <FontAwesomeIcon
                icon={faWifi}
                className="text-primary-foreground text-[17pt]"
              ></FontAwesomeIcon>
            </div>
            <div className="flex font-bold text-[20pt]">
              Connections ({data?.length})
            </div>
          </div>

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
          <AddConnectionModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            onOpen={onOpen}
          ></AddConnectionModal>
        </div>

        {data?.length ? (
          <div className="flex flex-col flex-1 mt-[0.5rem] gap-[1rem] pl-[1rem] pr-[2.5rem] pb-[5rem]">
            {data.map((connection) => (
              <Connection
                key={connection.id}
                connection={connection}
              ></Connection>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 text-center justify-center items-center flex-col gap-[1rem] px-[0.5rem]">
            <img
              src={EmptySVG}
              alt="device"
              className="h-[12rem] md:h-[15rem]"
            />
            <div className="flex text-[18pt] font-bold">No connections yet</div>
            <div className="flex text-[13pt] opacity-70">
              Start by adding an MQTT broker connection
            </div>
            <Button
              radius="full"
              color="primary"
              variant="ghost"
              startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              onPress={onOpen}
            >
              Add connection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
