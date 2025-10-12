import { HTMLAttributes, PropsWithChildren } from "react";

// style
import { modalForm } from "@/app/(beforeLogin)/_component/modal/modal.css";

export default function DefaultForm({
  children,
  ...props
}: HTMLAttributes<HTMLFormElement> & PropsWithChildren) {
  return (
    <form onSubmit={props.onSubmit} className={modalForm}>
      {children}
    </form>
  );
}
