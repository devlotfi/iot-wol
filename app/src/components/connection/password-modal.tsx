import { faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import type { DisclosureProps } from "../../types/disclosure-props";
import { ValidatedInput } from "../validated-input";
import { useState } from "react";

interface PasswordModalProps extends DisclosureProps {
  onSubmit: (value: string) => void;
}

export default function PasswordModal({
  onSubmit,
  isOpen,
  onClose,
  onOpenChange,
}: PasswordModalProps) {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object({
      password: yup.string().required(),
    }),
    onSubmit(values) {
      onSubmit(values.password);
      onClose();
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-[1rem]"
          >
            <ModalHeader className="flex flex-col gap-1">
              Connection authenthication
            </ModalHeader>
            <ModalBody>
              <ValidatedInput
                isRequired
                type={isVisible ? "text" : "password"}
                formik={formik}
                name="password"
                label="Password"
                classNames={{
                  inputWrapper: "shadow-none border border-divider",
                }}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-solid outline-transparent"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                    )}
                  </button>
                }
              ></ValidatedInput>
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                type="submit"
                color="primary"
                startContent={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
              >
                Connect
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
