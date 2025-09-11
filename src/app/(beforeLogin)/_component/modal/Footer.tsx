import { PropsWithChildren } from "react";

// style
import style from "@/app/(beforeLogin)/_component/modal/modal.module.css";

export default function Footer({ children }: PropsWithChildren) {
  return <div className={style.modalFooter}>{children}</div>;
}
