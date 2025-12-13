import { Alert } from "@heroui/react";
import EmptySVG from "../assets/empty.svg";
import { useTranslation } from "react-i18next";

export default function NoContentScreen() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-col gap-[1rem]">
        <img src={EmptySVG} alt="map-loading" className="h-[13rem]" />
        <Alert color="primary" variant="bordered">
          {t("noContent")}
        </Alert>
      </div>
    </div>
  );
}
