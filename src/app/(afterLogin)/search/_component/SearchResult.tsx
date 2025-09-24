"use client";

import { useQuery } from "@tanstack/react-query";

// component
import Post from "@/app/(afterLogin)/_component/Post";

// type
import { Post as IPost } from "@/model/post";

// api
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5, // inactive 5분 후 gc 처리
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
