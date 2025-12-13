import { faComputer, faGear, faWifi } from "@fortawesome/free-solid-svg-icons";
import LogoSVG from "../assets/logo.svg";
import NavigationButton from "./navigation-button";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex justify-center items-center w-[6rem] bg-content1">
      <img src={LogoSVG} alt="logo" className="absolute top-[1rem] h-[3rem]" />

      <div className="flex flex-col items-center w-full gap-[0.5rem] p-[0.3rem]">
        <NavigationButton path="/" icon={faComputer}>
          {t("devices")}
        </NavigationButton>
        <NavigationButton path="/connections" icon={faWifi}>
          {t("connections")}
        </NavigationButton>
        <NavigationButton path="/settings" icon={faGear}>
          {t("settings")}
        </NavigationButton>
      </div>
    </div>
  );
}
