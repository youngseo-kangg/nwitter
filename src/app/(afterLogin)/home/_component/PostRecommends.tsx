"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";

// api
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

// component
import Post from "@/app/(afterLogin)/_component/Post";

// type
import { Post as IPost } from "@/model/post";

// style
import styles from "@/app/(afterLogin)/home/page.module.css";

export default function PostRecommends() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const { data, hasNextPage, fetchNextPage, isFetching, isPending } =
    useSuspenseInfiniteQuery<
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

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          className={styles.loader}
          height="100%"
          viewBox="0 0 32 32"
          width={40}
        >
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(29, 155, 240)",
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  return (
    <>
      {data.pages.map((page, idx) => (
        <Fragment key={`post_wrapper_${idx}`}>
          {page.map((postRecommends) => (
            <Post key={`post_${postRecommends.postId}`} post={postRecommends} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} />
    </>
  );
}
