import { PropsWithChildren } from "react";
import NextForm, { FormProps as NextFormProps } from "next/form";

export default function Form({
  children,
  ...props
}: NextFormProps & PropsWithChildren) {
  return (
    <NextForm action={props.action} onSubmit={props.onSubmit}>
      {children}
    </NextForm>
  );
}
