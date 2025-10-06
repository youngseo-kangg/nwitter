"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

// style
import style from "./post.module.css";

// type
import { Post } from "@/model/post";

type Props = {
  children: ReactNode;
  post: Post;
};

export default function PostLink({ children, post }: Props) {
  const router = useRouter();
  let target = post;
  if (post.Original) target = post.Original;

  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };

  return (
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}
