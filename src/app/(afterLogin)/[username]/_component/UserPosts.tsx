"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

// api
import { getUserPosts } from "../_lib/getUserPosts";

// component
import Post from "@/app/(afterLogin)/_component/Post";

// type
import { Post as IPost } from "@/model/post";

type Props = {
  username: string;
};
export default function UserPosts({ username }: Props) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);
  console.log("user", user);

  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5,
    enabled: !!user,
  });

  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }

  return null;
}
