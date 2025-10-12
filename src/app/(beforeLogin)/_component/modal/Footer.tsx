import { PropsWithChildren } from "react";

// style
import { modalFooter } from "@/app/(beforeLogin)/_component/modal/modal.css";

export default function Footer({ children }: PropsWithChildren) {
  return <div className={modalFooter}>{children}</div>;
}
