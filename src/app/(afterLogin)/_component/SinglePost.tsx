"use client";

import { useQuery } from "@tanstack/react-query";

// api
import { getSinglePost } from "../_lib/getSinglePost";

// component
import Post from "@/app/(afterLogin)/_component/Post";

// type
import { Post as IPost } from "@/model/post";

type Props = {
  id: string;
  noImage?: boolean;
};
export default function SignlePost({ id, noImage }: Props) {
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

  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        게시글을 찾을 수 없습니다.
      </div>
    );
  }
  if (!post) {
    return null;
  }
  return <Post key={post.postId} post={post} noImage={noImage} />;
}
