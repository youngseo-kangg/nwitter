// style
import { message } from "@/app/(beforeLogin)/_component/modal/modal.css";

export default function Message({ msg }: { msg: string }) {
  return <div className={message}>{msg}</div>;
}
