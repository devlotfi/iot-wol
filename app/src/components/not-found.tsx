import Error404SVG from "../assets/error-404.svg";
import { Button, ButtonGroup, Divider } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@tanstack/react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-[1rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <img src={Error404SVG} alt="404" className="h-[10rem]" />
        <div className="flex text-[13pt] font-medium text-center">
          We didn't find what youre looking for
        </div>
        <Divider></Divider>

        <ButtonGroup fullWidth>
          <Button
            fullWidth
            variant="ghost"
            color="primary"
            startContent={<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>}
            onPress={() =>
              navigate({
                to: "/",
              })
            }
          >
            Landing page
          </Button>
          <Button
            fullWidth
            variant="ghost"
            color="primary"
            startContent={
              <FontAwesomeIcon icon={faMapMarkedAlt}></FontAwesomeIcon>
            }
            onPress={() =>
              navigate({
                to: "/",
              })
            }
          >
            Map
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
