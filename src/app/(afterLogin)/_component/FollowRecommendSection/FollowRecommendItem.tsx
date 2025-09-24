"use client";

import Link from "next/link";

// type
import { User } from "@/model/user";

// style
import style from "./followRecommendItem.module.css";

type Props = {
  user: User;
};

export default function FollowRecommend({ user }: Props) {
  const onFollow = () => {};

  return (
    <Link href={`/${user.id}`} className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </Link>
  );
}
