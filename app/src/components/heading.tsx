import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeadingProps {
  icon: IconProp;
  title: string;
}

export default function Heading({ icon, title }: HeadingProps) {
  return (
    <div className="flex items-center gap-[0.5rem] md:gap-[1rem]">
      <div className="flex justify-center items-center rounded-full h-[2.5rem] w-[2.5rem] md:h-[3rem] md:w-[3rem] bg-primary">
        <FontAwesomeIcon
          icon={icon}
          className="text-primary-foreground text-[17pt]"
        ></FontAwesomeIcon>
      </div>
      <div className="flex font-bold text-[16pt] md:text-[20pt]">{title}</div>
    </div>
  );
}
