"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

// style
import style from "./post.module.css";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

export default function PostLink({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}
