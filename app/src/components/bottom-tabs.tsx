import { faComputer, faWifi, faGear } from "@fortawesome/free-solid-svg-icons";
import NavigationButton from "./navigation-button";

export default function BottomTabs() {
  return (
    <div className="flex bg-content1 md:hidden h-[5rem] pb-[0.7rem] flex-col relative items-center justify-center">
      <div className="flex items-center w-full gap-[0.5rem] p-[0.3rem]">
        <NavigationButton path="/" icon={faComputer}>
          Devices
        </NavigationButton>
        <NavigationButton path="/connections" icon={faWifi}>
          Connections
        </NavigationButton>
        <NavigationButton path="/settings" icon={faGear}>
          Settings
        </NavigationButton>
      </div>
    </div>
  );
}
