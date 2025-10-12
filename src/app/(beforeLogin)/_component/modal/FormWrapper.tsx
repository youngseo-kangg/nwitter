import { PropsWithChildren } from "react";

// style
import { modalBody } from "@/app/(beforeLogin)/_component/modal/modal.css";

export default function FormWrapper({ children }: PropsWithChildren) {
  return <div className={modalBody}>{children}</div>;
}
