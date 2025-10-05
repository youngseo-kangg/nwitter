"use client";

import { useRouter } from "next/navigation";
import { faker } from "@faker-js/faker";
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
  const router = useRouter();
  const user = {
    id: "hero",
    nickname: "영웅",
    Messages: [
      { roomId: 123, content: "안녕하세요.", createdAt: new Date() },
      { roomId: 123, content: "안녕히가세요.", createdAt: new Date() },
    ],
  };

  const onClick = () => {
    router.push(`/messages/${room.room}`);
  };

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={room.Receiver.image} alt={`${room.Receiver.id}의 이미지`} />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{room.Receiver.nickname}</b>
          &nbsp;
          <span>@{room.Receiver.id}</span>
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
