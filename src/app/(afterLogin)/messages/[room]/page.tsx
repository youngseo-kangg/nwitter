import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";

import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

// components
import MessageForm from "./_component/MessageForm";
import UserInfo from "./_component/UserInfo";
import WebSocketComponent from "./_component/WebSocketComponent";

// style
import style from "./chatRoom.module.css";

// api
import { getUserServer } from "../../[username]/_lib/getUserServer";

type Props = {
  params: Promise<{ room: string }>;
};
export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const { room } = await params;
  const ids = room.split("-").filter((id) => id !== session?.user?.email);
  if (!ids[0]) return null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });
  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "yskangg",
      content: "안녕하세요.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "안녕히가세요.",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === "yskangg") {
            // 내 메시지면
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
      <MessageForm id={ids[0]} />
    </main>
  );
}
