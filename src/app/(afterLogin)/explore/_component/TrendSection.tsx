"use client";

import { useQuery } from "@tanstack/react-query";

// component
import Trend from "@/app/(afterLogin)/_component/Trend";

// tyle
import { Hashtag } from "@/model/hashtag";

// api
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
