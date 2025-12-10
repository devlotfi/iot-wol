import { Alert } from "@heroui/react";
import ErrorSVG from "../assets/error.svg";

export default function ErrorScreen() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-col gap-[1rem]">
        <img src={ErrorSVG} alt="map-loading" className="h-[13rem]" />
        <Alert color="danger">An error occured</Alert>
      </div>
    </div>
  );
}
