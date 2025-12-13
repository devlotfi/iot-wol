import { useContext } from "react";
import { MqttContext } from "../../context/mqtt-context";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import LogoSVG from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlug,
  faPlugCircleXmark,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { PWAContext } from "../../context/pwa-context";

export default function ConnectionStatus() {
  const { t } = useTranslation();
  const { connectionData, mqttDisconnect } = useContext(MqttContext);
  const { beforeInstallPromptEvent } = useContext(PWAContext);

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
                {connectionData.isConnected ? (
                  <Chip
                    variant="bordered"
                    size="lg"
                    color="success"
                    startContent={
                      <FontAwesomeIcon icon={faPlug}></FontAwesomeIcon>
                    }
                  >
                    {t("connected")}
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
                    {t("disconnected")}
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
                {t("noConnection")}
              </Chip>
            )}

            {beforeInstallPromptEvent ? (
              <Button
                size="sm"
                radius="full"
                color="primary"
                startContent={
                  <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                }
                onPress={() => beforeInstallPromptEvent.prompt()}
                className="text-[11pt]"
              >
                {t("install")}
              </Button>
            ) : null}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
