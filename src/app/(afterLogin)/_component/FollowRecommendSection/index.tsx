"use client";

import { useQuery } from "@tanstack/react-query";

// type
import { User } from "@/model/user";

// api
import { getFollowRecommends } from "../../_lib/getFollowRecommends";

// component
import FollowRecommend from "./FollowRecommendItem";

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5,
  });

  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
