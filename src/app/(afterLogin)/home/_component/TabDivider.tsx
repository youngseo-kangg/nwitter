"use client";

import { useContext } from "react";

// components
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import PostFollowing from "@/app/(afterLogin)/home/_component/PostFollowing";

export default function TabDivider() {
  const { tab } = useContext(TabContext);
  if (tab === "foryou") {
    return <PostRecommends />;
  }
  return <PostFollowing />;
}
