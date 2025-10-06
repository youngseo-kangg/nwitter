"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

// type
import { Room as IRoom } from "@/model/room";

// style
import style from "@/app/(afterLogin)/messages/message.module.css";

type Props = {
  room: IRoom;
};
export default function Room({ room }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const onClick = () => {
    router.push(`/messages/${room.room}`);
  };
  const user =
    room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={user.image} alt={`${room.Receiver.id}의 이미지`} />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>{room.content}</div>
      </div>
    </div>
  );
}
