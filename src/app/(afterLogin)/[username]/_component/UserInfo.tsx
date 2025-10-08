"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";

// component
import { BackButton } from "@/app/(afterLogin)/_component/Buttons";

// type
import { User } from "@/model/user";
import { Session } from "next-auth";

// api
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";

// style
import style from "@/app/(afterLogin)/[username]/profile.module.css";

type Props = {
  username: string;
  session: Session | null;
};
export default function UserInfo({ username, session }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
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

  const onMessage = () => {
    const ids = [session?.user?.email, user.id];
    ids.sort();
    router.push(`/messages/${ids.join("-")}`);
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
            <>
              <button onClick={onMessage} className={style.messageButton}>
                <svg
                  width={18}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
                >
                  <g>
                    <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                  </g>
                </svg>
              </button>
              <button
                onClick={onFollow}
                className={cx(style.followButton, followed && style.followed)}
              >
                {followed ? "팔로잉" : "팔로우"}
              </button>
            </>
          )}
        </div>
        <div className={style.userFollower}>
          <div>{user._count.Followers} 팔로워</div>
          &nbsp;
          <div>{user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
}
