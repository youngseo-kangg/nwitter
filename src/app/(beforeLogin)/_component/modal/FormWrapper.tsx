import { PropsWithChildren } from "react";

// style
import style from "@/app/(beforeLogin)/_component/modal/modal.module.css";

export default function FormWrapper({ children }: PropsWithChildren) {
  return <div className={style.modalBody}>{children}</div>;
}
