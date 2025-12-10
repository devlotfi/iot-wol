import { Button, cn, type ButtonProps } from "@heroui/react";
import {
  useMatch,
  useNavigate,
  type FileRouteTypes,
} from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavigationButtonProps extends ButtonProps {
  path: FileRouteTypes["to"];
  icon: IconProp;
}

export default function NavigationButton({
  path,
  icon,
  children,
  className,
  ...props
}: NavigationButtonProps) {
  const navigate = useNavigate();
  const isActive = useMatch({ from: path, shouldThrow: false });

  return (
    <Button
      fullWidth
      variant="light"
      className={cn("min-w-auto h-auto", className)}
      onPress={() => {
        navigate({ to: path });
      }}
      {...props}
    >
      <div className="flex flex-col items-center p-[0.3rem] md:p-[0.5rem]">
        <FontAwesomeIcon
          icon={icon}
          className={cn(
            "text-[14pt] px-[1rem] py-[0.3rem]",
            isActive && "text-primary-foreground bg-primary rounded-full  "
          )}
        ></FontAwesomeIcon>
        <div
          className={cn(
            "flex text-[10pt] font-medium",
            isActive && "text-primary"
          )}
        >
          {children}
        </div>
      </div>
    </Button>
  );
}
