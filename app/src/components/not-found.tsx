import Error404SVG from "../assets/error-404.svg";
import { Button, Divider } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-[1rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <img src={Error404SVG} alt="404" className="h-[10rem]" />
        <div className="flex text-[13pt] font-medium text-center">
          {t("notFound")}
        </div>
        <Divider></Divider>

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
          {t("landingPage")}
        </Button>
      </div>
    </div>
  );
}
