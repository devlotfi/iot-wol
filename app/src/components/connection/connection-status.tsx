import { useContext } from "react";
import { MqttContext } from "../../context/mqtt-context";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import LogoSVG from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlug,
  faPlugCircleXmark,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";

export default function ConnectionStatus() {
  const { connectionData, mqttDisconnect } = useContext(MqttContext);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await mqttDisconnect();
    },
  });

  return (
    <>
      <div className="flex justify-center sticky pt-[1rem] top-0 z-20">
        <Card className="rounded-full" shadow="lg">
          <CardBody className="flex-row p-[0.5rem] gap-[0.5rem]">
            <img src={LogoSVG} alt="logo" className="h-[2rem]" />
            {connectionData ? (
              <>
                <Chip
                  size="lg"
                  variant="bordered"
                  className="border border-divider"
                >
                  {connectionData.name}
                </Chip>
                {connectionData.isConnected ? (
                  <Chip
                    variant="bordered"
                    size="lg"
                    color="success"
                    startContent={
                      <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                    }
                  >
                    Connected
                  </Chip>
                ) : (
                  <Chip
                    variant="bordered"
                    size="lg"
                    color="danger"
                    startContent={
                      <FontAwesomeIcon
                        icon={faPlugCircleXmark}
                      ></FontAwesomeIcon>
                    }
                  >
                    Disconnected
                  </Chip>
                )}
                <Button
                  isIconOnly
                  variant="bordered"
                  color="danger"
                  radius="full"
                  size="sm"
                  isLoading={isPending}
                  onPress={() => mutate()}
                >
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </Button>
              </>
            ) : (
              <Chip
                variant="bordered"
                size="lg"
                className="border border-divider"
              >
                No connection
              </Chip>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
