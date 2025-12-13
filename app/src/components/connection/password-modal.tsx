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
import { useTranslation } from "react-i18next";

interface PasswordModalProps extends DisclosureProps {
  onSubmit: (value: string) => void;
}

export default function PasswordModal({
  onSubmit,
  isOpen,
  onClose,
  onOpenChange,
}: PasswordModalProps) {
  const { t } = useTranslation();
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
              {t("connectionAuthenthication")}
            </ModalHeader>
            <ModalBody>
              <ValidatedInput
                isRequired
                type={isVisible ? "text" : "password"}
                formik={formik}
                name="password"
                label={t("password")}
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
                {t("connect")}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
