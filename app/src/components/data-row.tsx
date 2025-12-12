import { cn } from "@heroui/react";
import type { ComponentProps } from "react";

interface DataRowProps extends ComponentProps<"div"> {
  name: string;
  value: string;
}

export default function DataRow({
  name,
  value,
  className,
  ...props
}: DataRowProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center gap-[0.5rem]",
        className
      )}
      {...props}
    >
      <div className="flex text-[12pt] opacity-80">{name}:</div>
      <div className="flex h-[1px] flex-1 bg-divider"></div>
      <div className="flex text-[12pt]">{value}</div>
    </div>
  );
}
