/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, type InputProps } from "@heroui/react";

interface Props extends InputProps {
  formik: any;
}

export function ValidatedInput({
  name,
  formik,
  label,
  placeholder,
  type = "text",
  endContent,
  ...props
}: Props) {
  if (name) {
    return (
      <Input
        variant="bordered"
        type={type}
        name={name}
        value={formik.values[name]}
        isInvalid={!!(formik.errors[name] && formik.touched[name])}
        errorMessage={
          formik.errors[name] && formik.touched[name]
            ? formik.errors[name]
            : undefined
        }
        color={
          formik.errors[name] && formik.touched[name] ? "danger" : "default"
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label={label}
        placeholder={placeholder}
        endContent={endContent}
        {...props}
      />
    );
  }
}
