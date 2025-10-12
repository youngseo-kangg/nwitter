import { ButtonHTMLAttributes } from "react";

// style
import { actionButton } from "@/app/(beforeLogin)/_component/modal/modal.css";

type Props = {
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ title, disabled }: Props) {
  return (
    <button className={actionButton} disabled={disabled}>
      {title}
    </button>
  );
}
