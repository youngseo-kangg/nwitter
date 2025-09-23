"use client";

import { useQuery } from "@tanstack/react-query";

// api
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

// component
import Post from "@/app/(afterLogin)/_component/Post";

// type
import { Post as IPost } from "@/model/post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });

  if (!data) return;

  return data.map((post) => <Post key={post.postId} post={post} />);
}
