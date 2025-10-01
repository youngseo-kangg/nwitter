"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import cx from "classnames";

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
  const queryClient = useQueryClient();
  const { data: session } = useSession();
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

  if (!user) {
    return null;
  }

  const followed = user.Followers?.find((v) => v.id === session?.user?.email);
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
            { id: session?.user?.email as string },
          ],
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers + 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        user.id,
      ]);

      if (userValues) {
        const copiedValues = {
          ...userValues,
          Followers: [
            ...userValues.Followers,
            { id: session?.user?.email as string },
          ],
          _count: {
            ...userValues._count,
            Followers: userValues._count.Followers + 1,
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
            (v) => v.id !== (session?.user?.email as string)
          ),
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        user.id,
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

        queryClient.setQueryData(["users", user.id], copiedValues);
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
            (v) => v.id !== (session?.user?.email as string)
          ),
          _count: {
            ...copiedValues[targetIdx]._count,
            Followers: copiedValues[targetIdx]._count.Followers - 1,
          },
        };

        queryClient.setQueryData(["users", "followRecommends"], copiedValues);
      }

      const userValues: User | undefined = queryClient.getQueryData([
        "users",
        user.id,
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
            { id: session?.user?.email as string },
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
            { id: session?.user?.email as string },
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
      unFollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

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

          {user.id !== session?.user?.email && (
            <button
              onClick={onFollow}
              className={cx(style.followButton, followed && style.followed)}
            >
              {followed ? "팔로잉" : "팔로우"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
