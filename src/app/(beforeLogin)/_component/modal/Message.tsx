import style from "@/app/(beforeLogin)/_component/modal/modal.module.css";

export default function Message({ msg }: { msg: string }) {
  return <div className={style.message}>{msg}</div>;
}
