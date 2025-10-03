"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";

// api
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";

// component
import Post from "@/app/(afterLogin)/_component/Post";
import Loading from "../loading";

// type
import { Post as IPost } from "@/model/post";

export default function FollowingPosts() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const { data, hasNextPage, fetchNextPage, isFetching, isPending } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [string, string],
      number
    >({
      queryKey: ["posts", "followings"],
      queryFn: getFollowingPosts,
      staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
      gcTime: 60 * 1000 * 5,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      initialPageParam: 0,
    });

  if (!data) return;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // 절반 이상 보이면 true
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      {data.pages.map((posts, idx) => (
        <Fragment key={`recommend_post_wrapper_${idx}`}>
          {posts.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} />
    </>
  );
}
