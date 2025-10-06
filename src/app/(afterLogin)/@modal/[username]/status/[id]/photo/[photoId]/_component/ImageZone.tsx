"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

// stype
import style from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/photoModal.module.css";

// components
import { ActionButtons } from "@/app/(afterLogin)/_component/Buttons";

// api
import { getSinglePost } from "@/app/(afterLogin)/_lib/getSinglePost";

// type
import { Post as IPost } from "@/model/post";

type Props = {
  id: string;
};
export default function ImageZone({ id }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5,
  });

  if (!post?.Images[0]) {
    return null;
  }

  return (
    <div className={style.imageZone}>
      <img src={post.Images[0].link} alt={post.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white post={post} />
        </div>
      </div>
    </div>
  );
}
