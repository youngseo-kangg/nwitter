"use client";

import TextareaAutosize from "react-textarea-autosize";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

// hook
import useSocket from "../_lib/useSocket";

// style
import style from "./MessageForm.module.css";

// type
import { Message } from "@/model/message";
import { useMessageStore } from "@/store/message";

type Props = {
  id: string;
};
export default function MessageForm({ id }: Props) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const setGoDown = useMessageStore().setGoDown;
  const { data: session } = useSession();
  const [socket] = useSocket();

  const onSubmit = () => {
    if (!session?.user?.email) {
      return;
    }
    const ids = [session?.user?.email, id];
    ids.sort();

    socket?.emit("sendMessage", {
      senderId: session?.user?.email,
      receiverId: id,
      content,
    });

    // 이전 메세지 query 활용한 optimistic update
    const exMessages = queryClient.getQueryData([
      "rooms",
      {
        senderId: session?.user?.email,
        receiverId: id,
      },
      "messages",
    ]) as InfiniteData<Message[]>;
    if (exMessages && typeof exMessages === "object") {
      const newMessages = {
        ...exMessages,
        pages: [...exMessages.pages],
      };
      const lastPage = newMessages.pages.at(-1);
      const newLastPage = lastPage ? [...lastPage] : [];
      let lastMessageId = lastPage?.at(-1)?.messageId;

      newLastPage.push({
        senderId: session.user.email,
        receiverId: id,
        content,
        room: ids.join("-"),
        messageId: lastMessageId ? lastMessageId + 1 : 1,
        createdAt: new Date(),
      });

      newMessages.pages[newMessages.pages.length - 1] = newLastPage;
      queryClient.setQueryData(
        [
          "rooms",
          {
            senderId: session?.user?.email,
            receiverId: id,
          },
          "messages",
        ],
        newMessages
      );
      setGoDown(true);
    }

    setContent("");
  };
  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };
  const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      if (!content?.trim()) {
        return;
      }
      onSubmit();
      setContent("");
    }
  };

  return (
    <div className={style.formZone}>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <TextareaAutosize
          value={content}
          onChange={onChangeContent}
          onKeyDown={onEnter}
          placeholder="새 쪽지 작성하기"
        />
        <button
          className={style.submitButton}
          type="submit"
          disabled={!content?.trim()}
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            aria-hidden="true"
            className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"
          >
            <g>
              <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}
