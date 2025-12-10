import { faComputer, faGear, faWifi } from "@fortawesome/free-solid-svg-icons";
import LogoSVG from "../assets/logo.svg";
import NavigationButton from "./navigation-button";

export default function Sidebar() {
  return (
    <div className="hidden md:flex justify-center items-center w-[6rem] bg-content1">
      <img src={LogoSVG} alt="logo" className="absolute top-[1rem] h-[3rem]" />

      <div className="flex flex-col items-center w-full gap-[0.5rem] p-[0.3rem]">
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
