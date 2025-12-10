import {
  faComputer,
  faLanguage,
  faMoon,
  faPaintbrush,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, cn, Select, SelectItem } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ArSVG from "../assets/flags/ar.svg";
import FrSVG from "../assets/flags/fr.svg";
import EnSVG from "../assets/flags/en.svg";
import { ThemeContext } from "../context/theme-context";
import { ThemeOptions } from "../types/theme-options";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { themeOption, setTheme } = useContext(ThemeContext);
  const { i18n } = useTranslation();

  const renderFlag = (languageCode: string, className?: string) => {
    switch (languageCode) {
      case "ar":
        return (
          <img
            src={ArSVG}
            alt="ar"
            className={cn("h-[1.5rem]", className)}
          ></img>
        );
      case "fr":
        return (
          <img
            src={FrSVG}
            alt="fr"
            className={cn("h-[1.5rem]", className)}
          ></img>
        );
      case "en":
        return (
          <img
            src={EnSVG}
            alt="eb"
            className={cn("h-[1.5rem]", className)}
          ></img>
        );
    }
  };

  const renderThemeIcon = (themeOption: ThemeOptions) => {
    switch (themeOption) {
      case ThemeOptions.SYSTEM:
        return <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>;
      case ThemeOptions.LIGHT:
        return <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>;
      case ThemeOptions.DARK:
        return <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>;
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-col w-full max-w-screen-sm px-[1rem]">
        <Card>
          <CardBody>
            <div className="flex flex-col gap-[0.7rem]">
              <Select
                fullWidth
                label="Theme"
                selectionMode="single"
                selectedKeys={new Set([themeOption])}
                onChange={(e) => {
                  setTheme(e.target.value as ThemeOptions);
                }}
                disallowEmptySelection
                endContent={
                  <FontAwesomeIcon icon={faPaintbrush}></FontAwesomeIcon>
                }
                renderValue={(items) =>
                  items.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-[0.3rem] py-[0.5rem] items-center"
                    >
                      {renderThemeIcon(item.key?.toString() as ThemeOptions)}
                      <div className="flex">{item.textValue}</div>
                    </div>
                  ))
                }
                classNames={{
                  trigger: "bg-content1 shadow-none border border-divider",
                }}
              >
                <SelectItem
                  key={ThemeOptions.SYSTEM}
                  startContent={
                    <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
                  }
                >
                  System
                </SelectItem>
                <SelectItem
                  key={ThemeOptions.LIGHT}
                  startContent={
                    <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
                  }
                >
                  Light
                </SelectItem>
                <SelectItem
                  key={ThemeOptions.DARK}
                  startContent={
                    <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
                  }
                >
                  Dark
                </SelectItem>
              </Select>

              <Select
                fullWidth
                label="Language"
                selectionMode="single"
                selectedKeys={new Set([i18n.language])}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
                disallowEmptySelection
                endContent={
                  <FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>
                }
                renderValue={(items) =>
                  items.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-[0.5rem] py-[0.5rem] items-center"
                    >
                      {renderFlag(item.key?.toString() || "", "h-[1.3rem]")}
                      <div className="flex">{item.textValue}</div>
                    </div>
                  ))
                }
                classNames={{
                  trigger: "bg-content1 shadow-none border border-divider",
                }}
              >
                <SelectItem key={"ar"} startContent={renderFlag("ar")}>
                  العربية
                </SelectItem>
                <SelectItem key={"fr"} startContent={renderFlag("fr")}>
                  Français
                </SelectItem>
                <SelectItem key={"en"} startContent={renderFlag("en")}>
                  English
                </SelectItem>
              </Select>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
