import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from "@heroui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ValidatedInput } from "./validated-input";
import { useQueryClient } from "@tanstack/react-query";
import { DeviceStore } from "../device-store";
import type { Device } from "../types/device";
import type { DisclosureProps } from "../types/disclosure-props";

interface EditDeviceModalProps extends DisclosureProps {
  device: Device;
}

export default function EditDeviceModal({
  device,
  isOpen,
  onClose,
  onOpenChange,
}: EditDeviceModalProps) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      name: device.name,
      mac: device.mac,
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      mac: yup
        .string()
        .matches(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, {
          message: "Invalid mac adress",
        })
        .required(),
    }),
    onSubmit(values) {
      console.log(values);
      DeviceStore.editDevice({
        id: device.id,
        ...values,
      });
      queryClient.resetQueries({
        queryKey: ["DEVICES"],
      });
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-[1rem]"
          >
            <ModalHeader className="flex flex-col gap-1">
              Edit device
            </ModalHeader>
            <ModalBody>
              <ValidatedInput
                formik={formik}
                name="name"
                label="Name"
                placeholder="Device name"
              ></ValidatedInput>
              <ValidatedInput
                formik={formik}
                name="mac"
                label="Mac address"
                placeholder="00:1A:2B:3C:4D:5E"
              ></ValidatedInput>
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                type="submit"
                color="primary"
                startContent={
                  <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>
                }
              >
                Edit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
