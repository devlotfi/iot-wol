import { Alert } from "@heroui/react";
import EmptySVG from "../assets/empty.svg";

export default function NoContentScreen() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-col gap-[1rem]">
        <img src={EmptySVG} alt="map-loading" className="h-[13rem]" />
        <Alert color="primary" variant="bordered">
          No Content
        </Alert>
      </div>
    </div>
  );
}
