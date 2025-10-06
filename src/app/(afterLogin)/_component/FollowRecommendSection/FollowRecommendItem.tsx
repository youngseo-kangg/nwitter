"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cx from "classnames";

// type
import { User } from "@/model/user";

// style
import style from "./followRecommendItem.module.css";

type Props = {
  user: User;
};

export default function FollowRecommend({ user }: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email);

  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          method: "post",
          credentials: "include",
        }
      );
    },
    onMutate: (userId: string) => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );

        if (targetIdx > -1) {
          const copiedValues = [...followRecommendsValues];

          copiedValues[targetIdx] = {
            ...copiedValues[targetIdx],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...copiedValues[targetIdx]._count,
              Followers: copiedValues[targetIdx]._count.Followers + 1,
            },
          };

          queryClient.setQueryData(["users", "followRecommends"], copiedValues);
        }
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        user.id,
      ]);

      if (userValues) {
        const copiedValues = {
          ...userValues,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...userValues._count,
            Followers: userValues._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", userId], copiedValues);
      }
    },
    onError: (userId: string) => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        if (targetIdx > -1) {
          const copiedValues = [...followRecommendsValues];

          copiedValues[targetIdx] = {
            ...copiedValues[targetIdx],
            Followers: copiedValues[targetIdx].Followers.filter(
              (v) => v.id !== (session?.user?.email as string)
            ),
            _count: {
              ...copiedValues[targetIdx]._count,
              Followers: copiedValues[targetIdx]._count.Followers - 1,
            },
          };

          queryClient.setQueryData(["users", "followRecommends"], copiedValues);
        }
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
      if (userValues) {
        const copiedValues = {
          ...userValues,
          Followers: userValues.Followers.filter(
            (v) => v.id !== (session?.user?.email as string)
          ),
          _count: {
            ...userValues._count,
            Followers: userValues._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", userId], copiedValues);
      }
    },
    onSettled: () => {},
  });

  const unFollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          method: "delete",
          credentials: "include",
        }
      );
    },
    onMutate: (userId: string) => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        if (targetIdx > -1) {
          const copiedValues = [...followRecommendsValues];

          copiedValues[targetIdx] = {
            ...copiedValues[targetIdx],
            Followers: copiedValues[targetIdx].Followers.filter(
              (v) => v.id !== (session?.user?.email as string)
            ),
            _count: {
              ...copiedValues[targetIdx]._count,
              Followers: copiedValues[targetIdx]._count.Followers - 1,
            },
          };

          queryClient.setQueryData(["users", "followRecommends"], copiedValues);
        }
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
      if (userValues) {
        const copiedValues = {
          ...userValues,
          Followers: userValues.Followers.filter(
            (v) => v.id !== (session?.user?.email as string)
          ),
          _count: {
            ...userValues._count,
            Followers: userValues._count.Followers - 1,
          },
        };

        console.log(copiedValues);
        queryClient.setQueryData(["users", userId], copiedValues);
      }
    },
    onError: (userId: string) => {
      const followRecommendsValues: User[] | undefined =
        queryClient.getQueryData(["users", "followRecommends"]);

      if (followRecommendsValues) {
        const targetIdx = followRecommendsValues.findIndex(
          (v) => v.id === user.id
        );
        if (targetIdx > -1) {
          const copiedValues = [...followRecommendsValues];

          copiedValues[targetIdx] = {
            ...copiedValues[targetIdx],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...copiedValues[targetIdx]._count,
              Followers: copiedValues[targetIdx]._count.Followers + 1,
            },
          };

          queryClient.setQueryData(["users", "followRecommends"], copiedValues);
        }
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
      if (userValues) {
        const copiedValues = {
          ...userValues,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...userValues._count,
            Followers: userValues._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", userId], copiedValues);
      }
    },
    onSettled: () => {},
  });

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (followed) {
      unFollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
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

      <div
        className={cx(style.followButtonSection, followed && style.followed)}
      >
        <button onClick={onFollow}>{followed ? "팔로잉" : "팔로우"}</button>
      </div>
    </Link>
  );
}
