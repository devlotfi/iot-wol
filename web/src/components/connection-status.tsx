import { Chip, type ChipProps } from "@heroui/react";
import { useContext } from "react";
import { MqttContext } from "../context/mqtt-context";
import { faLink, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConnectionStatus({ ...props }: ChipProps) {
  const { connectionData } = useContext(MqttContext);

  if (connectionData.isConnected) {
    return (
      <Chip
        color="success"
        startContent={<FontAwesomeIcon icon={faLink}></FontAwesomeIcon>}
        {...props}
      >
        Connected
      </Chip>
    );
  } else {
    return (
      <Chip
        color="danger"
        startContent={<FontAwesomeIcon icon={faLinkSlash}></FontAwesomeIcon>}
        {...props}
      >
        Disconnected
      </Chip>
    );
  }
}
