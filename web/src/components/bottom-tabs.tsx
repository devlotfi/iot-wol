import { Button, cn } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "@tanstack/react-router";
import ConnectionStatus from "./connection-status";

export default function BottomTabs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex lg:hidden min-h-[4rem] bg-content1 p-[0.5rem] border-t border-divider">
      <Button
        fullWidth
        variant="solid"
        className={cn(
          "flex-1 h-auto",
          pathname === "/"
            ? "text-primary font-bold bg-content2"
            : "bg-content1"
        )}
        onPress={() => navigate({ to: "/" })}
        startContent={<FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon>}
      >
        Devices
      </Button>

      <Button
        fullWidth
        variant="solid"
        className={cn(
          "flex-1 h-auto",
          pathname === "/connection"
            ? "text-primary font-bold bg-content2"
            : "bg-content1"
        )}
        onPress={() => navigate({ to: "/connection" })}
        endContent={<ConnectionStatus></ConnectionStatus>}
      >
        <FontAwesomeIcon icon={faBroadcastTower}></FontAwesomeIcon>
      </Button>
    </div>
  );
}
