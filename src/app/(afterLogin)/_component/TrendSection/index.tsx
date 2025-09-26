"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// component
import Trend from "@/app/(afterLogin)/_component/Trend";

// type
import { Hashtag } from "@/model/hashtag";

// api
import { getTrends } from "../../_lib/getTrends";

// style
import style from "./trendSection.module.css";

export default function TrendSection() {
  const pathname = usePathname();
  const { data } = useSession();
  const { data: trendData } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5,
    enabled: !!data?.user,
  });

  if (pathname === "/explore") return null;

  if (data?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {trendData?.map((trend) => (
            <Trend trend={trend} key={trend.tagId} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
