import { Button, cn, Link } from "@heroui/react";
import LogoSVG from "../assets/logo.svg";
import { ThemeOptions } from "../types/theme-options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faSun,
  faMoon,
  faComputer,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ThemeContext } from "../context/theme-context";
import { useLocation, useNavigate } from "@tanstack/react-router";
import ConnectionStatus from "./connection-status";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { themeOption, setTheme } = React.useContext(ThemeContext);
  const { pathname } = useLocation();

  const switchTheme = () => {
    switch (themeOption) {
      case ThemeOptions.LIGHT:
        setTheme(ThemeOptions.DARK);
        break;
      case ThemeOptions.DARK:
        setTheme(ThemeOptions.SYSTEM);
        break;
      case ThemeOptions.SYSTEM:
        setTheme(ThemeOptions.LIGHT);
        break;
    }
  };

  return (
    <div className="flex min-h-[4rem] bg-content1 items-center justify-center px-[1rem] border-b border-divider">
      <div className="flex items-center absolute left-[1rem] gap-[0.5rem]">
        <img src={LogoSVG} alt="logo" className="h-[2.5rem]" />
        <div className="hidden lg:flex text-primary text-[14pt] font-bold">
          IOT Wake On Lan
        </div>
        <div className="flex lg:hidden text-primary text-[14pt] font-bold">
          IOT WOL
        </div>
      </div>

      <div className="hidden lg:flex gap-[0.5rem]">
        <Button
          variant="solid"
          className={cn(
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
          variant="solid"
          className={cn(
            pathname === "/connection"
              ? "text-primary font-bold bg-content2"
              : "bg-content1"
          )}
          onPress={() => navigate({ to: "/connection" })}
          endContent={<ConnectionStatus></ConnectionStatus>}
        >
          Connection
        </Button>
      </div>

      <div className="flex absolute right-[1rem] gap-[0.5rem]">
        <Button
          href="https://github.com/devlotfi/iot-wol"
          target="_blank"
          as={Link}
          isIconOnly
          variant="bordered"
          className="bg-background text-[17pt]"
        >
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </Button>

        <Button
          isIconOnly
          variant="bordered"
          className="bg-background text-[17pt]"
          onPress={switchTheme}
        >
          {themeOption === ThemeOptions.LIGHT ? (
            <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
          ) : themeOption === ThemeOptions.DARK ? (
            <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
          )}
        </Button>
      </div>
    </div>
  );
}
