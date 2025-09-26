"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

// type
import { Post as IPost } from "@/model/post";

// api
import { getComments } from "@/app/(afterLogin)/_lib/getComments";

// component
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  id: string;
};
export default function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5,
    enabled: !!post,
  });

  if (post) {
    return data?.map((post) => <Post post={post} key={post.postId} />);
  }
  return null;
}
