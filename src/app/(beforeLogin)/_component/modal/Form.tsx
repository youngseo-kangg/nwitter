import { PropsWithChildren } from "react";
import NextForm, { FormProps as NextFormProps } from "next/form";

// style
import { modalForm } from "@/app/(beforeLogin)/_component/modal/modal.css";

export default function Form({
  children,
  ...props
}: NextFormProps & PropsWithChildren) {
  return (
    <NextForm
      action={props.action}
      onSubmit={props.onSubmit}
      className={modalForm}
    >
      {children}
    </NextForm>
  );
}
