"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// type
import { User } from "@/model/user";

// style
import style from "./followRecommendItem.module.css";

type Props = {
  user: User;
};

export default function FollowRecommend({ user }: Props) {
  const queryClient = useQueryClient();
  const session = useSession();
  const followed = !!user.Followers?.find(
    (v) => v.id === session?.data?.user?.email
  );

  const follow = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user.id}/follow`,
        {
          method: "post",
          credentials: "include",
        }
      );
    },
    onMutate: () => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        const copiedValues = [...followRecommendsValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: [
            ...copiedValues[targetIdx].Followers,
            { id: session.data?.user?.email as string },
          ],
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User[] | undefined = queryClient.getQueryData([
        "users",
        user.id,
      ]);
      if (userValues) {
        const targetIdx = userValues.findIndex((v) => v.id === user.id);
        const copiedValues = [...userValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: [
            ...copiedValues[targetIdx].Followers,
            { id: session.data?.user?.email as string },
          ],
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", user.id], copiedValues);
      }
    },
    onError: () => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        const copiedValues = [...followRecommendsValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: copiedValues[targetIdx].Followers.filter(
            (v) => v.id !== (session.data?.user?.email as string)
          ),
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User[] | undefined = queryClient.getQueryData([
        "users",
        user.id,
      ]);
      if (userValues) {
        const targetIdx = userValues.findIndex((v) => v.id === user.id);
        const copiedValues = [...userValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: copiedValues[targetIdx].Followers.filter(
            (v) => v.id !== (session.data?.user?.email as string)
          ),
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", user.id], copiedValues);
      }
    },
    onSettled: () => {},
  });

  const unFollow = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user.id}/follow`,
        {
          method: "delete",
          credentials: "include",
        }
      );
    },
    onMutate: () => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        const copiedValues = [...followRecommendsValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: copiedValues[targetIdx].Followers.filter(
            (v) => v.id !== (session.data?.user?.email as string)
          ),
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User[] | undefined = queryClient.getQueryData([
        "users",
        user.id,
      ]);
      if (userValues) {
        const targetIdx = userValues.findIndex((v) => v.id === user.id);
        const copiedValues = [...userValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: copiedValues[targetIdx].Followers.filter(
            (v) => v.id !== (session.data?.user?.email as string)
          ),
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", user.id], copiedValues);
      }
    },
    onError: () => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        const copiedValues = [...followRecommendsValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: [
            ...copiedValues[targetIdx].Followers,
            { id: session.data?.user?.email as string },
          ],
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User[] | undefined = queryClient.getQueryData([
        "users",
        user.id,
      ]);
      if (userValues) {
        const targetIdx = userValues.findIndex((v) => v.id === user.id);
        const copiedValues = [...userValues];

        copiedValues[targetIdx] = {
          ...copiedValues[targetIdx],
          Followers: [
            ...copiedValues[targetIdx].Followers,
            { id: session.data?.user?.email as string },
          ],
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", user.id], copiedValues);
      }
    },
    onSettled: () => {},
  });

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (followed) {
      unFollow.mutate();
    } else {
      follow.mutate();
    }
  };

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
