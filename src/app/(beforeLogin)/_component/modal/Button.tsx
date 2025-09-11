import { ButtonHTMLAttributes } from "react";

// style
import style from "@/app/(beforeLogin)/_component/modal/modal.module.css";

type Props = {
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ title, disabled }: Props) {
  return (
    <button className={style.actionButton} disabled={disabled}>
      {title}
    </button>
  );
}
