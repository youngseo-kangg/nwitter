"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";

// api
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

// component
import Post from "@/app/(afterLogin)/_component/Post";

// type
import { Post as IPost } from "@/model/post";

export default function PostRecommends() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<
    IPost[], // 리턴되는 데이터
    Object, // 에러
    InfiniteData<IPost[]>, // 리턴되는 데이터를 가공한 최종 데이터
    [string, string], // query key
    number // 페이지네이션에 쓰이는 pageParam의 타입
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
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

  return (
    <>
      {data.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((postRecommends) => (
            <Post key={postRecommends.postId} post={postRecommends} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} />
    </>
  );
}
