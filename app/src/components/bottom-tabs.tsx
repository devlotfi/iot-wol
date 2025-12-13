import { faComputer, faWifi, faGear } from "@fortawesome/free-solid-svg-icons";
import NavigationButton from "./navigation-button";
import { useTranslation } from "react-i18next";

export default function BottomTabs() {
  const { t } = useTranslation();

  return (
    <div className="flex bg-content1 md:hidden h-[5rem] pb-[0.7rem] flex-col relative items-center justify-center">
      <div className="flex items-center w-full gap-[0.5rem] p-[0.3rem]">
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
