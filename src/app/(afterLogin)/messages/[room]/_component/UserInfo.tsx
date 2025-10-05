"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

// component
import { BackButton } from "@/app/(afterLogin)/_component/Buttons";

// style
import style from "../chatRoom.module.css";

// api
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";

// type
import { User } from "@/model/user";

interface Props {
  id: string;
}
export default function UserInfo({ id }: Props) {
  const { data: user } = useQuery<User, Object, User, [_1: string, _2: string]>(
    {
      queryKey: ["users", id],
      queryFn: getUser,
      staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
      gcTime: 60 * 1000 * 5,
    }
  );

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
    </>
  );
}
