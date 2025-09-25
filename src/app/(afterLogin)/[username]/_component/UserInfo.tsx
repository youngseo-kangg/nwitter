"use client";

import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler } from "react";

// component
import { BackButton } from "@/app/(afterLogin)/_component/Buttons";

// type
import { User } from "@/model/user";

// api
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";

// style
import style from "@/app/(afterLogin)/[username]/profile.module.css";

type Props = {
  username: string;
};
export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 60 * 1000 * 5,
  });

  console.log("error");
  console.dir(error);

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {};

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          <button onClick={onFollow} className={style.followButton}>
            팔로우
          </button>
        </div>
      </div>
    </>
  );
}
